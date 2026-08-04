const express = require('express');
const helmet = require('helmet');
const { compress, decompress } = require('@mongodb-js/zstd');
const { Pool } = require('pg');
const { rateLimit } = require('express-rate-limit');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cloud.umami.is"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://cloud.umami.is"],
    }
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── DATABASE ──
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('.railway.internal')
    ? { rejectUnauthorized: false }
    : false
});

async function initDB() {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS codes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      character TEXT NOT NULL DEFAULT 'Unknown',
      code TEXT NOT NULL,
      tags TEXT[] DEFAULT '{}',
      author TEXT DEFAULT 'Anonymous',
      likes INTEGER DEFAULT 0,
      copies INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS comments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code_id UUID REFERENCES codes(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      author TEXT DEFAULT 'Anonymous',
      likes INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('DB schema ready');
}

// ── RATE LIMITING ──
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, slow down.' }
});
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions, try again later.' }
});
app.use('/api/', generalLimiter);
app.use('/api/library', (req, res, next) => {
  if (req.method === 'POST') return writeLimiter(req, res, next);
  next();
});
app.use('/api/library/:id/comments', (req, res, next) => {
  if (req.method === 'POST') return writeLimiter(req, res, next);
  next();
});

// ── API TOKEN AUTH ──
const BETA_PASS = process.env.BETA_PASSWORD || 'JJS2026';
function makeToken(pass) {
  return crypto.createHash('sha256').update(pass + 'jjs_api_v1').digest('hex').slice(0, 40);
}
const VALID_TOKEN = makeToken(BETA_PASS);

function requireToken(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== VALID_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
app.use('/api/library', requireToken);
app.use('/api/generate', requireToken);
app.use('/api/decode', requireToken);

// ── GENERATE ──
function buildSlot(input) {
  return {
    K_NAME: input.slotType || 'SKILL',
    NAME: input.name || 'Custom Move',
    COOLDOWN: Number(input.cooldown) || 5,
    KEY: Number(input.key) || 1,
    ADD: true,
    DATA: JSON.stringify({
      Line: [
        { K_NAME: 'STATE', STATE: 'IFrame', VALUE: true, TIME: 0.1 },
        {
          K_NAME: 'HITBOX',
          POSITION: '0, 0, 3',
          SIZE: '8, 8, 8',
          DAMAGE: Number(input.damage) || 20,
          STUN: Number(input.stun) || 0.5,
          'ATTACK TYPE': input.attackType || 'Normal',
          BLOCKABLE: input.blockable !== false
        },
        {
          K_NAME: 'VELO',
          FORCE: Number(input.force) || 50,
          Y: Number(input.forceY) || 0,
          TIME: 0.3,
          FADE: true,
          TRACK: false,
          'LAST HIT': false
        },
        { K_NAME: 'WAIT', TIME: Number(input.duration) || 0.5 },
        { K_NAME: 'STATE', STATE: 'IFrame', VALUE: false, TIME: 0 }
      ],
      Branch: {},
      Req: [],
      Prop: {}
    })
  };
}

app.post('/api/generate', async (req, res) => {
  try {
    const { moves } = req.body;
    if (!moves || !Array.isArray(moves) || moves.length === 0) {
      return res.status(400).json({ error: 'Add at least one move' });
    }
    if (moves.length > 50) {
      return res.status(400).json({ error: 'Maximum 50 moves allowed' });
    }
    const slots = moves.map(buildSlot);
    const json = JSON.stringify(slots);
    const bytes = Buffer.from(json, 'utf-8');
    const compressed = await compress(bytes);
    const code = compressed.toString('base64');
    res.json({ code, slotsCount: slots.length, jsonPreview: json.slice(0, 200) + '...' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DECODE ──
app.post('/api/decode', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || typeof code !== 'string') return res.status(400).json({ error: 'code required' });
    if (code.length > 100000) return res.status(400).json({ error: 'Code too large' });
    const compressed = Buffer.from(code.trim(), 'base64');
    if (compressed.length > 65536) return res.status(400).json({ error: 'Compressed payload too large' });
    const decompressed = await decompress(compressed);
    const json = JSON.parse(decompressed.toString('utf-8'));
    res.json({ slots: json });
  } catch (err) {
    res.status(400).json({ error: 'Invalid code: ' + err.message });
  }
});

// ── BETA AUTH ──
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts, try again later.' }
});
app.post('/api/auth', authLimiter, (req, res) => {
  const { password } = req.body;
  if (password === BETA_PASS) {
    res.json({ ok: true, token: VALID_TOKEN });
  } else {
    res.status(401).json({ ok: false });
  }
});

// ── LIBRARY: list codes ──
app.get('/api/library', async (req, res) => {
  try {
    const SORT_MAP = { likes: 'likes', copies: 'copies', new: 'created_at' };
    const col = SORT_MAP[req.query.sort] || 'likes';
    const params = [];
    let where = '';
    if (req.query.author) {
      params.push(req.query.author);
      where = `WHERE author ILIKE $1`;
    }
    const { rows } = await pool.query(
      `SELECT id, name, character, tags, author, likes, copies, created_at
       FROM codes ${where}
       ORDER BY ${col} DESC LIMIT 50`,
      params
    );
    res.json({ codes: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LIBRARY: get single code ──
app.get('/api/library/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM codes WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    await pool.query('UPDATE codes SET copies = copies + 1 WHERE id = $1', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
});

// ── LIBRARY: like ──
app.post('/api/library/:id/like', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE codes SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true, likes: rows[0].likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LIBRARY: submit code ──
app.post('/api/library', async (req, res) => {
  try {
    const { name, character, code, tags, author } = req.body;
    if (!name || !code) return res.status(400).json({ error: 'name and code required' });
    const { rows } = await pool.query(
      `INSERT INTO codes (name, character, code, tags, author)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        name.slice(0, 80),
        (character || 'Unknown').slice(0, 60),
        code,
        Array.isArray(tags) ? tags.slice(0, 5) : [],
        (author || 'Anonymous').slice(0, 40)
      ]
    );
    res.json({ ok: true, id: rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: get for code ──
app.get('/api/library/:id/comments', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, text, author, likes, created_at
       FROM comments WHERE code_id = $1
       ORDER BY created_at DESC LIMIT 50`,
      [req.params.id]
    );
    res.json({ comments: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: post comment ──
app.post('/api/library/:id/comments', async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || text.trim().length === 0) return res.status(400).json({ error: 'text required' });
    const { rows } = await pool.query(
      `INSERT INTO comments (code_id, text, author)
       VALUES ($1, $2, $3) RETURNING id, text, author, likes, created_at`,
      [req.params.id, text.slice(0, 500), (author || 'Anonymous').slice(0, 40)]
    );
    res.json({ ok: true, comment: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: like comment ──
app.post('/api/library/comments/:commentId/like', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE comments SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [req.params.commentId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true, likes: rows[0].likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── TEMP: one-time migration endpoint (remove after use) ──
const MIGRATION_TOKEN = process.env.MIGRATION_TOKEN || '';
if (MIGRATION_TOKEN) {
  const { createClient: sbCreate } = require('@supabase/supabase-js');
  app.post('/api/_migrate', async (req, res) => {
    const auth = req.headers['authorization'] || '';
    if (auth !== `Bearer ${MIGRATION_TOKEN}`) return res.status(401).json({ error: 'nope' });
    const sb = sbCreate(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
    const { data: codes } = await sb.from('codes').select('*').order('created_at').limit(500);
    let ok = 0, fail = 0;
    for (const c of codes || []) {
      try {
        await pool.query(
          `INSERT INTO codes (id, name, character, code, tags, author, likes, copies, created_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
          [c.id, c.name, c.character||'Unknown', c.code,
           Array.isArray(c.tags)?c.tags:[], c.author||'Anonymous',
           c.likes||0, c.copies||0, c.created_at]
        );
        ok++;
      } catch(e) { fail++; }
    }
    const { data: comments } = await sb.from('comments').select('*').order('created_at').limit(1000);
    let cOk = 0;
    for (const cm of comments || []) {
      try {
        await pool.query(
          `INSERT INTO comments (id, code_id, text, author, likes, created_at)
           VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
          [cm.id, cm.code_id, cm.text, cm.author||'Anonymous', cm.likes||0, cm.created_at]
        );
        cOk++;
      } catch(e) {}
    }
    res.json({ codes: { ok, fail, total: codes?.length }, comments: { ok: cOk, total: comments?.length } });
  });
}

const PORT = process.env.PORT || 4242;
initDB().then(() => {
  app.listen(PORT, () => console.log(`JJS Generator: http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB init failed:', err.message);
  process.exit(1);
});
