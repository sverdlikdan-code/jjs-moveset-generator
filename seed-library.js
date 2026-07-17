// Seed JJS Library with sample movesets
// Run: node seed-library.js

const BASE = 'https://jjs-moveset-generator-production.up.railway.app';

const MOVESETS = [
  {
    name: 'Sukuna Domain Expansion',
    character: 'Sukuna',
    author: 'RedInkJJS',
    tags: ['pvp', 'domain', 'sukuna', 'meta'],
    moves: [
      { name: 'Dismantle', slotType: 'SKILL', damage: 35, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 60, duration: 0.4 },
      { name: 'Cleave', slotType: 'MELEE', damage: 45, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 80, duration: 0.5 },
      { name: 'Malevolent Shrine', slotType: 'SPECIAL', damage: 70, stun: 1.2, cooldown: 20, attackType: 'Normal', force: 100, duration: 1.0 },
      { name: 'Arrow Slash', slotType: 'CHASE', damage: 30, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 90, duration: 0.3 },
    ]
  },
  {
    name: 'Gojo Infinity Lock',
    character: 'Gojo',
    author: 'Community',
    tags: ['pvp', 'gojo', 'infinity', 'defensive'],
    moves: [
      { name: 'Blue', slotType: 'SKILL', damage: 40, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 120, duration: 0.3 },
      { name: 'Red', slotType: 'SKILL', damage: 50, stun: 0.6, cooldown: 7, attackType: 'Normal', force: 140, duration: 0.4 },
      { name: 'Purple', slotType: 'SPECIAL', damage: 80, stun: 1.5, cooldown: 25, attackType: 'Normal', force: 200, duration: 1.2 },
      { name: 'Infinity Grab', slotType: 'MELEE', damage: 25, stun: 0.8, cooldown: 8, attackType: 'Normal', force: 40, duration: 0.6 },
    ]
  },
  {
    name: 'Yuta Full Power',
    character: 'Yuta',
    author: 'Community',
    tags: ['yuta', 'rika', 'copy', 'combo'],
    moves: [
      { name: 'Rika Slash', slotType: 'MELEE', damage: 38, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'Copy Technique', slotType: 'SKILL', damage: 42, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 65, duration: 0.5 },
      { name: 'Rika Summon', slotType: 'SPECIAL', damage: 75, stun: 1.0, cooldown: 18, attackType: 'Normal', force: 90, duration: 0.9 },
      { name: 'Cursed Speech', slotType: 'SKILL', damage: 20, stun: 2.0, cooldown: 12, attackType: 'Normal', force: 10, duration: 0.3 },
    ]
  },
  {
    name: 'Toji Fushiguro Speed Run',
    character: 'Toji',
    author: 'Community',
    tags: ['toji', 'speedrun', 'melee', 'no-cursed-energy'],
    moves: [
      { name: 'Inverted Spear', slotType: 'MELEE', damage: 50, stun: 0.4, cooldown: 3, attackType: 'Normal', force: 110, duration: 0.3 },
      { name: 'Chain Whip', slotType: 'MELEE', damage: 35, stun: 0.3, cooldown: 2, attackType: 'Normal', force: 85, duration: 0.25 },
      { name: 'Heavenly Restriction Dash', slotType: 'CHASE', damage: 28, stun: 0.2, cooldown: 2, attackType: 'Normal', force: 130, duration: 0.2 },
      { name: 'Massacre', slotType: 'SPECIAL', damage: 90, stun: 0.8, cooldown: 22, attackType: 'Normal', force: 150, duration: 0.7 },
    ]
  },
  {
    name: 'Nanami Workman Build',
    character: 'Nanami',
    author: 'Community',
    tags: ['nanami', 'ratio', 'blunt', 'balanced'],
    moves: [
      { name: '7:3 Strike', slotType: 'SKILL', damage: 55, stun: 0.7, cooldown: 6, attackType: 'Normal', force: 75, duration: 0.5 },
      { name: 'Blunt Slash', slotType: 'MELEE', damage: 40, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 65, duration: 0.4 },
      { name: 'Overtime', slotType: 'AWAKENING', damage: 60, stun: 0.9, cooldown: 15, attackType: 'Normal', force: 95, duration: 0.7 },
      { name: 'Sheath Counter', slotType: 'SKILL', damage: 45, stun: 1.0, cooldown: 10, attackType: 'Normal', force: 80, duration: 0.5 },
    ]
  },
  {
    name: 'Nobara Hammer Time',
    character: 'Nobara',
    author: 'Community',
    tags: ['nobara', 'straw-doll', 'resonance', 'pvp'],
    moves: [
      { name: 'Nail Throw', slotType: 'SKILL', damage: 30, stun: 0.4, cooldown: 3, attackType: 'Normal', force: 55, duration: 0.3 },
      { name: 'Hammer Strike', slotType: 'MELEE', damage: 45, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 60, duration: 0.45 },
      { name: 'Resonance', slotType: 'SPECIAL', damage: 65, stun: 1.8, cooldown: 20, attackType: 'Normal', force: 30, duration: 0.8 },
      { name: 'Straw Doll Barrage', slotType: 'SKILL', damage: 35, stun: 0.3, cooldown: 6, attackType: 'Normal', force: 45, duration: 0.5 },
    ]
  },
  {
    name: 'Megumi Shadow Spam',
    character: 'Megumi',
    author: 'Community',
    tags: ['megumi', 'shikigami', 'divine-dogs', 'shadow'],
    moves: [
      { name: 'Divine Dogs', slotType: 'SKILL', damage: 38, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'Nue', slotType: 'SKILL', damage: 42, stun: 0.4, cooldown: 6, attackType: 'Normal', force: 85, duration: 0.35 },
      { name: 'Mahoraga', slotType: 'SPECIAL', damage: 85, stun: 1.5, cooldown: 30, attackType: 'Normal', force: 120, duration: 1.2 },
      { name: 'Shadow Kick', slotType: 'MELEE', damage: 32, stun: 0.4, cooldown: 3, attackType: 'Normal', force: 75, duration: 0.3 },
    ]
  },
  {
    name: 'Choso Blood Manipulation',
    character: 'Choso',
    author: 'Community',
    tags: ['choso', 'blood', 'piercing-blood', 'zoner'],
    moves: [
      { name: 'Piercing Blood', slotType: 'SKILL', damage: 55, stun: 0.3, cooldown: 5, attackType: 'Normal', force: 180, duration: 0.2 },
      { name: 'Blood Meteorite', slotType: 'SKILL', damage: 45, stun: 0.8, cooldown: 8, attackType: 'Normal', force: 60, duration: 0.6 },
      { name: 'Supernova', slotType: 'SPECIAL', damage: 75, stun: 1.2, cooldown: 22, attackType: 'Normal', force: 95, duration: 1.0 },
      { name: 'Convergence', slotType: 'CHASE', damage: 35, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 100, duration: 0.3 },
    ]
  },
  {
    name: 'Hakari Jackpot Build',
    character: 'Hakari',
    author: 'Community',
    tags: ['hakari', 'jackpot', 'domain', 'aggressive'],
    moves: [
      { name: 'Idle Death Gamble', slotType: 'SPECIAL', damage: 80, stun: 1.0, cooldown: 20, attackType: 'Normal', force: 100, duration: 0.9 },
      { name: 'Pachinko Slam', slotType: 'MELEE', damage: 48, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 85, duration: 0.5 },
      { name: 'Fever Rush', slotType: 'SKILL', damage: 40, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 90, duration: 0.4 },
      { name: 'Roulette Kick', slotType: 'CHASE', damage: 30, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 110, duration: 0.3 },
    ]
  },
  {
    name: 'Itadori Rush Combo',
    character: 'Itadori',
    author: 'Community',
    tags: ['itadori', 'divergent-fist', 'rush', 'beginner'],
    moves: [
      { name: 'Divergent Fist', slotType: 'MELEE', damage: 42, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 80, duration: 0.4 },
      { name: 'Manji Kick', slotType: 'MELEE', damage: 38, stun: 0.4, cooldown: 3, attackType: 'Normal', force: 95, duration: 0.35 },
      { name: 'Black Flash', slotType: 'SPECIAL', damage: 70, stun: 1.0, cooldown: 18, attackType: 'Normal', force: 120, duration: 0.8 },
      { name: 'Suplex', slotType: 'SKILL', damage: 35, stun: 0.8, cooldown: 6, attackType: 'Normal', force: 50, duration: 0.6 },
    ]
  },
];

async function generateCode(moves) {
  const res = await fetch(`${BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ moves })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.code;
}

async function submitToLibrary(entry, code) {
  const res = await fetch(`${BASE}/api/library`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: entry.name,
      character: entry.character,
      author: entry.author,
      tags: entry.tags,
      code
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.id;
}

async function seed() {
  console.log(`Seeding ${MOVESETS.length} movesets...\n`);
  let ok = 0;
  for (const entry of MOVESETS) {
    try {
      const code = await generateCode(entry.moves);
      const id = await submitToLibrary(entry, code);
      console.log(`✓ ${entry.name} [${entry.character}] → ${id}`);
      ok++;
    } catch (e) {
      console.error(`✗ ${entry.name}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\nDone: ${ok}/${MOVESETS.length} uploaded`);
}

seed();
