const express = require('express');
const { compress, decompress } = require('@mongodb-js/zstd');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
    const compressed = Buffer.from(code.trim(), 'base64');
    const decompressed = await decompress(compressed);
    const json = JSON.parse(decompressed.toString('utf-8'));
    res.json({ slots: json });
  } catch (err) {
    res.status(400).json({ error: 'Invalid code: ' + err.message });
  }
});

// ── BETA AUTH ──
app.post('/api/auth', (req, res) => {
  const { password } = req.body;
  const BETA_PASS = process.env.BETA_PASSWORD || 'JJS2026';
  if (password === BETA_PASS) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
});

// ── LIBRARY: list codes ──
app.get('/api/library', async (req, res) => {
  try {
    const sort = req.query.sort || 'likes'; // likes | copies | new
    const column = sort === 'new' ? 'created_at' : sort;
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

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`JJS Generator: http://localhost:${PORT}`));
