const express = require('express');
const helmet = require('helmet');
const { compress, decompress } = require('@mongodb-js/zstd');
const { createClient } = require('@supabase/supabase-js');
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
      connectSrc: ["'self'", "https://*.supabase.co", "https://cloud.umami.is"],
    }
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── RATE LIMITING ──
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
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
// Apply to all API routes except /api/auth itself
app.use('/api/library', requireToken);
app.use('/api/generate', requireToken);
app.use('/api/decode', requireToken);

// Supabase client (service role — server side only)
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || ''
);

// Build a JJS slot object from simple form input
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
          'ATTACK TYPE': input.attackType || 'Normal'
        },
        {
          K_NAME: 'VELO',
          FORCE: Number(input.force) || 50,
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

// ── GENERATE ──
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
    const column = SORT_MAP[req.query.sort] || 'likes';
    const { data, error } = await supabase
      .from('codes')
      .select('id, name, character, tags, author, likes, copies, created_at')
      .order(column, { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ codes: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LIBRARY: get single code (with the actual code string) ──
app.get('/api/library/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('codes')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    // bump copies counter
    await supabase.from('codes').update({ copies: (data.copies || 0) + 1 }).eq('id', req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
});

// ── LIBRARY: like ──
app.post('/api/library/:id/like', async (req, res) => {
  try {
    const { data } = await supabase.from('codes').select('likes').eq('id', req.params.id).single();
    const { error } = await supabase.from('codes').update({ likes: (data.likes || 0) + 1 }).eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true, likes: (data.likes || 0) + 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LIBRARY: submit code ──
app.post('/api/library', async (req, res) => {
  try {
    const { name, character, code, tags, author } = req.body;
    if (!name || !code) return res.status(400).json({ error: 'name and code required' });
    const { data, error } = await supabase.from('codes').insert([{
      name: name.slice(0, 80),
      character: (character || 'Unknown').slice(0, 60),
      code,
      tags: Array.isArray(tags) ? tags.slice(0, 5) : [],
      author: (author || 'Anonymous').slice(0, 40)
    }]).select().single();
    if (error) throw error;
    res.json({ ok: true, id: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: get for code ──
app.get('/api/library/:id/comments', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('id, text, author, likes, created_at')
      .eq('code_id', req.params.id)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ comments: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: post comment ──
app.post('/api/library/:id/comments', async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || text.trim().length === 0) return res.status(400).json({ error: 'text required' });
    const { data, error } = await supabase.from('comments').insert([{
      code_id: req.params.id,
      text: text.slice(0, 500),
      author: (author || 'Anonymous').slice(0, 40),
      likes: 0
    }]).select().single();
    if (error) throw error;
    res.json({ ok: true, comment: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── COMMENTS: like comment ──
app.post('/api/library/comments/:commentId/like', async (req, res) => {
  try {
    const { data } = await supabase.from('comments').select('likes').eq('id', req.params.commentId).single();
    const { error } = await supabase.from('comments').update({ likes: (data.likes || 0) + 1 }).eq('id', req.params.commentId);
    if (error) throw error;
    res.json({ ok: true, likes: (data.likes || 0) + 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`JJS Generator: http://localhost:${PORT}`));
