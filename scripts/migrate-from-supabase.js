// One-time migration: Supabase -> Railway PostgreSQL
// Run via: railway run node scripts/migrate-from-supabase.js

const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: false });

async function migrate() {
  console.log('Fetching codes from Supabase...');
  const { data: codes, error } = await supabase
    .from('codes')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(500);

  if (error) { console.error('Supabase error:', error.message); process.exit(1); }
  console.log(`Found ${codes.length} codes`);

  let inserted = 0;
  for (const c of codes) {
    try {
      await pool.query(
        `INSERT INTO codes (id, name, character, code, tags, author, likes, copies, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [c.id, c.name, c.character || 'Unknown', c.code,
         Array.isArray(c.tags) ? c.tags : [],
         c.author || 'Anonymous', c.likes || 0, c.copies || 0, c.created_at]
      );
      inserted++;
    } catch (e) {
      console.warn(`Skip code ${c.id}: ${e.message}`);
    }
  }
  console.log(`Codes migrated: ${inserted}/${codes.length}`);

  console.log('Fetching comments from Supabase...');
  const { data: comments, error: ce } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1000);

  if (ce) { console.error('Supabase comments error:', ce.message); }
  else {
    let cInserted = 0;
    for (const cm of (comments || [])) {
      try {
        await pool.query(
          `INSERT INTO comments (id, code_id, text, author, likes, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING`,
          [cm.id, cm.code_id, cm.text, cm.author || 'Anonymous', cm.likes || 0, cm.created_at]
        );
        cInserted++;
      } catch (e) {
        console.warn(`Skip comment ${cm.id}: ${e.message}`);
      }
    }
    console.log(`Comments migrated: ${cInserted}/${comments?.length || 0}`);
  }

  await pool.end();
  console.log('Migration complete.');
}

migrate().catch(e => { console.error(e); process.exit(1); });
