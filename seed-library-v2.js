// JJS Library Seed v2 — 40 authentic builds with real game move names
// Run: node seed-library-v2.js

const BASE = 'https://jjs-moveset-generator-production.up.railway.app';

const MOVESETS = [

  // ── HONORED ONE (GOJO) ──
  {
    name: 'Infinity Rush', character: 'Honored One (Gojo)', author: 'Community',
    tags: ['gojo', 'pvp', 'rush', 'meta'],
    moves: [
      { name: 'Lapse Blue', slotType: 'SKILL', damage: 45, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 140, duration: 0.3 },
      { name: 'Reversal Red', slotType: 'SKILL', damage: 50, stun: 0.6, cooldown: 7, attackType: 'Normal', force: 160, duration: 0.4 },
      { name: 'Rapid Punches', slotType: 'MELEE', damage: 30, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 60, duration: 0.25 },
      { name: 'Hollow Purple', slotType: 'SPECIAL', damage: 90, stun: 1.5, cooldown: 25, attackType: 'Normal', force: 200, duration: 1.2 },
    ]
  },
  {
    name: 'Infinite Void Domain', character: 'Honored One (Gojo)', author: 'Community',
    tags: ['gojo', 'domain', 'defensive', 'infinite-void'],
    moves: [
      { name: 'Infinity', slotType: 'SKILL', damage: 10, stun: 1.0, cooldown: 8, attackType: 'Normal', force: 20, duration: 0.8 },
      { name: 'Lapse Blue MAX', slotType: 'SPECIAL', damage: 70, stun: 0.8, cooldown: 20, attackType: 'Normal', force: 180, duration: 0.9 },
      { name: 'Face Grater', slotType: 'MELEE', damage: 40, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 75, duration: 0.4 },
      { name: 'Hollow Purple', slotType: 'SPECIAL', damage: 85, stun: 1.5, cooldown: 28, attackType: 'Normal', force: 200, duration: 1.2 },
    ]
  },
  {
    name: 'Six Eyes Counter', character: 'Honored One (Gojo)', author: 'Community',
    tags: ['gojo', 'counter', 'reversal-red', 'pvp'],
    moves: [
      { name: 'Reversal Red MAX', slotType: 'SPECIAL', damage: 80, stun: 1.0, cooldown: 22, attackType: 'Normal', force: 200, duration: 1.0 },
      { name: 'Six Eyes', slotType: 'SKILL', damage: 15, stun: 0.2, cooldown: 3, attackType: 'Normal', force: 30, duration: 0.2 },
      { name: 'Twofold Kick', slotType: 'MELEE', damage: 38, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 90, duration: 0.35 },
      { name: 'Unlimited Purple', slotType: 'SPECIAL', damage: 95, stun: 1.8, cooldown: 30, attackType: 'Normal', force: 220, duration: 1.5 },
    ]
  },

  // ── VESSEL (SUKUNA) ──
  {
    name: 'Shrine Cleave Combo', character: 'Vessel (Sukuna)', author: 'Community',
    tags: ['sukuna', 'shrine', 'combo', 'pvp'],
    moves: [
      { name: 'Cleave', slotType: 'SKILL', damage: 55, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 85, duration: 0.45 },
      { name: 'Dismantle', slotType: 'SKILL', damage: 40, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 70, duration: 0.35 },
      { name: 'Cursed Strikes', slotType: 'MELEE', damage: 35, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 65, duration: 0.3 },
      { name: 'Malevolent Shrine', slotType: 'SPECIAL', damage: 85, stun: 1.2, cooldown: 22, attackType: 'Normal', force: 110, duration: 1.0 },
    ]
  },
  {
    name: 'Open World Slash', character: 'Vessel (Sukuna)', author: 'Community',
    tags: ['sukuna', 'open', 'slash', 'zoner'],
    moves: [
      { name: 'Open', slotType: 'SPECIAL', damage: 75, stun: 1.0, cooldown: 18, attackType: 'Normal', force: 130, duration: 0.9 },
      { name: 'World Cutting Slash', slotType: 'SKILL', damage: 60, stun: 0.7, cooldown: 8, attackType: 'Normal', force: 100, duration: 0.6 },
      { name: 'Rush', slotType: 'CHASE', damage: 32, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 120, duration: 0.25 },
      { name: 'Black Flash', slotType: 'SKILL', damage: 65, stun: 0.9, cooldown: 10, attackType: 'Normal', force: 95, duration: 0.7 },
    ]
  },
  {
    name: 'King of Curses Awakening', character: 'Vessel (Sukuna)', author: 'Community',
    tags: ['sukuna', 'awakening', 'king-of-curses', 'aggressive'],
    moves: [
      { name: 'King of Curses', slotType: 'AWAKENING', damage: 50, stun: 0.8, cooldown: 15, attackType: 'Normal', force: 80, duration: 0.7 },
      { name: 'Black Flash Chain', slotType: 'SKILL', damage: 55, stun: 0.6, cooldown: 7, attackType: 'Normal', force: 90, duration: 0.5 },
      { name: 'Manji Kick', slotType: 'MELEE', damage: 42, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 100, duration: 0.4 },
      { name: 'Malevolent Shrine', slotType: 'SPECIAL', damage: 90, stun: 1.3, cooldown: 25, attackType: 'Normal', force: 115, duration: 1.1 },
    ]
  },

  // ── RESTLESS GAMBLER (HAKARI) ──
  {
    name: 'Idle Death Gamble Setup', character: 'Restless Gambler (Hakari)', author: 'Community',
    tags: ['hakari', 'jackpot', 'domain', 'fever'],
    moves: [
      { name: 'Shutter Doors', slotType: 'SKILL', damage: 35, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 65, duration: 0.4 },
      { name: 'Fever Breaker', slotType: 'SKILL', damage: 45, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 85, duration: 0.5 },
      { name: 'Rough Energy', slotType: 'MELEE', damage: 38, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 75, duration: 0.35 },
      { name: 'Idle Death Gamble', slotType: 'SPECIAL', damage: 80, stun: 1.0, cooldown: 20, attackType: 'Normal', force: 100, duration: 0.9 },
    ]
  },
  {
    name: 'Fever Rush Aggressive', character: 'Restless Gambler (Hakari)', author: 'Community',
    tags: ['hakari', 'fever', 'rush', 'aggressive'],
    moves: [
      { name: 'Fever Crush', slotType: 'MELEE', damage: 48, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 90, duration: 0.5 },
      { name: 'Lucky Rushdown', slotType: 'CHASE', damage: 35, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 115, duration: 0.25 },
      { name: 'Reserve Balls', slotType: 'SKILL', damage: 42, stun: 0.5, cooldown: 6, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'Jackpot', slotType: 'SPECIAL', damage: 85, stun: 1.2, cooldown: 22, attackType: 'Normal', force: 110, duration: 1.0 },
    ]
  },

  // ── TEN SHADOWS (MEGUMI) ──
  {
    name: 'Chimera Shadow Garden', character: 'Ten Shadows (Megumi)', author: 'Community',
    tags: ['megumi', 'domain', 'shadow', 'shikigami'],
    moves: [
      { name: 'Divine Dog: Totality', slotType: 'SKILL', damage: 45, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 80, duration: 0.5 },
      { name: 'Nue', slotType: 'SKILL', damage: 40, stun: 0.4, cooldown: 5, attackType: 'Normal', force: 90, duration: 0.35 },
      { name: 'Shadow Swarm', slotType: 'SPECIAL', damage: 65, stun: 0.9, cooldown: 18, attackType: 'Normal', force: 75, duration: 0.8 },
      { name: 'Domain Expansion: Chimera Shadow Garden', slotType: 'SPECIAL', damage: 80, stun: 1.5, cooldown: 30, attackType: 'Normal', force: 95, duration: 1.3 },
    ]
  },
  {
    name: 'Mahoraga Summon', character: 'Ten Shadows (Megumi)', author: 'Community',
    tags: ['megumi', 'mahoraga', 'boss', 'high-risk'],
    moves: [
      { name: 'Toad', slotType: 'SKILL', damage: 38, stun: 0.7, cooldown: 7, attackType: 'Normal', force: 60, duration: 0.6 },
      { name: 'Max Elephant', slotType: 'SKILL', damage: 55, stun: 0.8, cooldown: 10, attackType: 'Normal', force: 110, duration: 0.7 },
      { name: 'Lurking Shadow', slotType: 'CHASE', damage: 30, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 100, duration: 0.25 },
      { name: 'Mahoraga', slotType: 'SPECIAL', damage: 95, stun: 2.0, cooldown: 35, attackType: 'Normal', force: 130, duration: 1.5 },
    ]
  },

  // ── MAHORAGA ──
  {
    name: 'Sword of Extermination', character: 'Mahoraga', author: 'Community',
    tags: ['mahoraga', 'sword', 'adaptation', 'boss'],
    moves: [
      { name: 'Adaptation Wheel', slotType: 'SKILL', damage: 20, stun: 0.2, cooldown: 4, attackType: 'Normal', force: 30, duration: 0.2 },
      { name: 'Attack Mode: Sword of Extermination', slotType: 'MELEE', damage: 60, stun: 0.8, cooldown: 6, attackType: 'Normal', force: 120, duration: 0.6 },
      { name: 'Divine Pummel', slotType: 'MELEE', damage: 50, stun: 0.7, cooldown: 5, attackType: 'Normal', force: 100, duration: 0.5 },
      { name: 'Special Mode: World Slash', slotType: 'SPECIAL', damage: 100, stun: 1.5, cooldown: 28, attackType: 'Normal', force: 160, duration: 1.3 },
    ]
  },

  // ── PERFECTION (MAHITO) ──
  {
    name: 'Idle Transfiguration Control', character: 'Perfection (Mahito)', author: 'Community',
    tags: ['mahito', 'transfiguration', 'domain', 'soul'],
    moves: [
      { name: 'Self Transfiguration', slotType: 'SKILL', damage: 30, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 50, duration: 0.35 },
      { name: 'Body Disfigure: Drill Splitter', slotType: 'SKILL', damage: 55, stun: 0.7, cooldown: 7, attackType: 'Normal', force: 85, duration: 0.6 },
      { name: 'Chainwhip', slotType: 'MELEE', damage: 40, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'Idle Transfiguration', slotType: 'SPECIAL', damage: 75, stun: 1.5, cooldown: 22, attackType: 'Normal', force: 40, duration: 1.2 },
    ]
  },
  {
    name: 'Embodiment Rush', character: 'Perfection (Mahito)', author: 'Community',
    tags: ['mahito', 'embodiment', 'rush', 'blade-mode'],
    moves: [
      { name: 'Blade Mode', slotType: 'AWAKENING', damage: 45, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 90, duration: 0.4 },
      { name: 'Soul Fire', slotType: 'SKILL', damage: 50, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 80, duration: 0.5 },
      { name: 'Awakening Black Flash', slotType: 'SKILL', damage: 65, stun: 0.8, cooldown: 10, attackType: 'Normal', force: 100, duration: 0.7 },
      { name: 'Embodiment of Self Perfection', slotType: 'SPECIAL', damage: 90, stun: 1.2, cooldown: 25, attackType: 'Normal', force: 120, duration: 1.0 },
    ]
  },

  // ── BLOOD MANIPULATOR (CHOSO) ──
  {
    name: 'Piercing Blood Zoner', character: 'Blood Manipulator (Choso)', author: 'Community',
    tags: ['choso', 'zoner', 'piercing-blood', 'long-range'],
    moves: [
      { name: 'Piercing Blood', slotType: 'SKILL', damage: 60, stun: 0.3, cooldown: 5, attackType: 'Normal', force: 190, duration: 0.2 },
      { name: 'Blood Edge', slotType: 'SKILL', damage: 45, stun: 0.5, cooldown: 6, attackType: 'Normal', force: 100, duration: 0.4 },
      { name: 'Flowing Red Scale', slotType: 'AWAKENING', damage: 35, stun: 0.3, cooldown: 4, attackType: 'Normal', force: 70, duration: 0.3 },
      { name: 'Plasma Wave', slotType: 'SPECIAL', damage: 80, stun: 1.0, cooldown: 22, attackType: 'Normal', force: 120, duration: 0.9 },
    ]
  },
  {
    name: 'Wing King Domination', character: 'Blood Manipulator (Choso)', author: 'Community',
    tags: ['choso', 'wing-king', 'blood-rain', 'aggressive'],
    moves: [
      { name: 'Blood Rain', slotType: 'SKILL', damage: 50, stun: 0.7, cooldown: 7, attackType: 'Normal', force: 55, duration: 0.6 },
      { name: 'Convergence', slotType: 'CHASE', damage: 38, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 105, duration: 0.3 },
      { name: 'Duty as a Brother', slotType: 'SKILL', damage: 42, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 65, duration: 0.5 },
      { name: 'Wing King', slotType: 'SPECIAL', damage: 85, stun: 1.2, cooldown: 24, attackType: 'Normal', force: 95, duration: 1.0 },
    ]
  },

  // ── SWITCHER (TODO) ──
  {
    name: 'Boogie Woogie Swap', character: 'Switcher (Aoi Todo)', author: 'Community',
    tags: ['todo', 'boogie-woogie', 'swap', 'disorienting'],
    moves: [
      { name: 'Boogie Woogie', slotType: 'SKILL', damage: 20, stun: 0.8, cooldown: 6, attackType: 'Normal', force: 40, duration: 0.6 },
      { name: 'Brute Force', slotType: 'MELEE', damage: 55, stun: 0.6, cooldown: 4, attackType: 'Normal', force: 110, duration: 0.5 },
      { name: 'Brutal Impact', slotType: 'MELEE', damage: 48, stun: 0.7, cooldown: 5, attackType: 'Normal', force: 95, duration: 0.5 },
      { name: 'Brothers', slotType: 'SPECIAL', damage: 70, stun: 1.0, cooldown: 20, attackType: 'Normal', force: 80, duration: 0.9 },
    ]
  },
  {
    name: 'False Memories Reset', character: 'Switcher (Aoi Todo)', author: 'Community',
    tags: ['todo', 'false-memories', 'elbow', 'pvp'],
    moves: [
      { name: 'Swift Kick', slotType: 'MELEE', damage: 40, stun: 0.4, cooldown: 3, attackType: 'Normal', force: 100, duration: 0.3 },
      { name: 'Elbow Drop', slotType: 'MELEE', damage: 50, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 85, duration: 0.45 },
      { name: 'False Memories', slotType: 'SKILL', damage: 15, stun: 1.2, cooldown: 10, attackType: 'Normal', force: 20, duration: 1.0 },
      { name: 'Brothers', slotType: 'SPECIAL', damage: 75, stun: 1.0, cooldown: 22, attackType: 'Normal', force: 90, duration: 0.9 },
    ]
  },

  // ── DEFENSE ATTORNEY (HIGURUMA) ──
  {
    name: "Executioner's Sword Finisher", character: 'Defense Attorney (Higuruma)', author: 'Community',
    tags: ['higuruma', 'executioner', 'domain', 'death-penalty'],
    moves: [
      { name: 'Gavel', slotType: 'MELEE', damage: 45, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 75, duration: 0.5 },
      { name: 'Pressing Charges', slotType: 'SKILL', damage: 38, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 65, duration: 0.4 },
      { name: 'Death Penalty', slotType: 'SKILL', damage: 55, stun: 0.8, cooldown: 8, attackType: 'Normal', force: 80, duration: 0.7 },
      { name: "Executioner's Sword", slotType: 'SPECIAL', damage: 100, stun: 1.0, cooldown: 25, attackType: 'Normal', force: 50, duration: 0.9 },
    ]
  },
  {
    name: 'Final Judgement Domain', character: 'Defense Attorney (Higuruma)', author: 'Community',
    tags: ['higuruma', 'final-judgement', 'domain', 'verdict'],
    moves: [
      { name: 'Justice Served', slotType: 'SKILL', damage: 42, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'No Escape', slotType: 'SKILL', damage: 35, stun: 0.8, cooldown: 7, attackType: 'Normal', force: 45, duration: 0.7 },
      { name: 'Deadly Sentencing', slotType: 'SKILL', damage: 60, stun: 0.9, cooldown: 10, attackType: 'Normal', force: 85, duration: 0.8 },
      { name: 'Final Judgement', slotType: 'SPECIAL', damage: 90, stun: 1.5, cooldown: 28, attackType: 'Normal', force: 60, duration: 1.2 },
    ]
  },

  // ── CURSED PARTNERS (YUTA) ──
  {
    name: 'True Love Beam Sniper', character: 'Cursed Partners (Yuta)', author: 'Community',
    tags: ['yuta', 'true-love', 'rika', 'long-range'],
    moves: [
      { name: 'Swordsmanship', slotType: 'MELEE', damage: 42, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 75, duration: 0.4 },
      { name: 'Rika', slotType: 'SKILL', damage: 38, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 60, duration: 0.5 },
      { name: 'True Love Beam', slotType: 'SKILL', damage: 65, stun: 0.5, cooldown: 8, attackType: 'Normal', force: 180, duration: 0.4 },
      { name: 'Authentic Mutual Love', slotType: 'SPECIAL', damage: 90, stun: 1.2, cooldown: 26, attackType: 'Normal', force: 100, duration: 1.1 },
    ]
  },
  {
    name: "Jacob's Ladder Setup", character: 'Cursed Partners (Yuta)', author: 'Community',
    tags: ['yuta', 'jacobs-ladder', 'copy', 'combo'],
    moves: [
      { name: 'Copy: Cursed Speech', slotType: 'SKILL', damage: 20, stun: 1.5, cooldown: 10, attackType: 'Normal', force: 15, duration: 1.2 },
      { name: 'Resolute Slash', slotType: 'MELEE', damage: 50, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 85, duration: 0.4 },
      { name: 'Rika Slam', slotType: 'SKILL', damage: 55, stun: 0.8, cooldown: 7, attackType: 'Normal', force: 95, duration: 0.65 },
      { name: "Jacob's Ladder", slotType: 'SPECIAL', damage: 88, stun: 1.3, cooldown: 24, attackType: 'Normal', force: 70, duration: 1.2 },
    ]
  },
  {
    name: 'Copy Shrine Shrine', character: 'Cursed Partners (Yuta)', author: 'Community',
    tags: ['yuta', 'shrine', 'copy', 'thin-ice'],
    moves: [
      { name: 'Thin Ice Breaker', slotType: 'SKILL', damage: 55, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 90, duration: 0.5 },
      { name: 'Veilstep', slotType: 'CHASE', damage: 28, stun: 0.2, cooldown: 2, attackType: 'Normal', force: 130, duration: 0.2 },
      { name: 'Shrine', slotType: 'SKILL', damage: 60, stun: 0.7, cooldown: 8, attackType: 'Normal', force: 100, duration: 0.6 },
      { name: 'Authentic Mutual Love', slotType: 'SPECIAL', damage: 92, stun: 1.4, cooldown: 27, attackType: 'Normal', force: 105, duration: 1.2 },
    ]
  },

  // ── PUPPET MASTER (MECHAMARU) ──
  {
    name: 'Ultimate Cannon Barrage', character: 'Puppet Master (Mechamaru)', author: 'Community',
    tags: ['mechamaru', 'cannon', 'long-range', 'zoner'],
    moves: [
      { name: 'Puppet Barrage', slotType: 'SKILL', damage: 35, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 60, duration: 0.35 },
      { name: 'Ultra Cannon', slotType: 'SKILL', damage: 55, stun: 0.5, cooldown: 7, attackType: 'Normal', force: 150, duration: 0.4 },
      { name: 'Ultimate Cannon', slotType: 'SPECIAL', damage: 90, stun: 0.8, cooldown: 20, attackType: 'Normal', force: 200, duration: 0.7 },
      { name: 'Miracle Cannon', slotType: 'SPECIAL', damage: 85, stun: 1.0, cooldown: 25, attackType: 'Normal', force: 180, duration: 0.9 },
    ]
  },
  {
    name: 'Übercharge Burst', character: 'Puppet Master (Mechamaru)', author: 'Community',
    tags: ['mechamaru', 'ubercharge', 'burst', 'mode-absolute'],
    moves: [
      { name: 'Übercharge', slotType: 'AWAKENING', damage: 30, stun: 0.3, cooldown: 5, attackType: 'Normal', force: 50, duration: 0.4 },
      { name: 'Heat Emission', slotType: 'SKILL', damage: 45, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 80, duration: 0.5 },
      { name: 'Mode: Absolute', slotType: 'SKILL', damage: 65, stun: 0.8, cooldown: 10, attackType: 'Normal', force: 110, duration: 0.7 },
      { name: 'Absolute Destruction', slotType: 'SPECIAL', damage: 95, stun: 1.3, cooldown: 28, attackType: 'Normal', force: 140, duration: 1.2 },
    ]
  },

  // ── HEAD OF THE HEI (NAOYA) ──
  {
    name: 'Projection Sorcery Speed', character: 'Head of the Hei (Naoya)', author: 'Community',
    tags: ['naoya', 'projection', 'speed', 'flash'],
    moves: [
      { name: 'Projection Sorcery', slotType: 'AWAKENING', damage: 25, stun: 0.2, cooldown: 3, attackType: 'Normal', force: 120, duration: 0.15 },
      { name: 'Frame Freeze', slotType: 'SKILL', damage: 40, stun: 1.0, cooldown: 8, attackType: 'Normal', force: 30, duration: 0.8 },
      { name: 'Flash Freezing', slotType: 'SKILL', damage: 50, stun: 0.7, cooldown: 7, attackType: 'Normal', force: 95, duration: 0.5 },
      { name: 'Decisive Strike', slotType: 'MELEE', damage: 55, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 110, duration: 0.4 },
    ]
  },
  {
    name: 'Time Cell Moon Palace', character: 'Head of the Hei (Naoya)', author: 'Community',
    tags: ['naoya', 'time-cell', 'moon-palace', 'domain'],
    moves: [
      { name: 'Cursory Impact', slotType: 'MELEE', damage: 48, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 95, duration: 0.4 },
      { name: 'Vengeance', slotType: 'SKILL', damage: 55, stun: 0.7, cooldown: 7, attackType: 'Normal', force: 80, duration: 0.6 },
      { name: 'Tendril Grab', slotType: 'SKILL', damage: 42, stun: 0.9, cooldown: 8, attackType: 'Normal', force: 50, duration: 0.8 },
      { name: 'Time Cell Moon Palace', slotType: 'SPECIAL', damage: 88, stun: 1.5, cooldown: 26, attackType: 'Normal', force: 75, duration: 1.3 },
    ]
  },

  // ── SALARYMAN (NANAMI) ──
  {
    name: 'Ratio Point Breaker', character: 'Salaryman (Kento Nanami)', author: 'Community',
    tags: ['nanami', 'ratio', 'pvp', 'balanced'],
    moves: [
      { name: 'Ratio Point', slotType: 'SKILL', damage: 58, stun: 0.7, cooldown: 6, attackType: 'Normal', force: 80, duration: 0.55 },
      { name: 'Ratio Black Flash', slotType: 'SKILL', damage: 70, stun: 0.9, cooldown: 9, attackType: 'Normal', force: 95, duration: 0.7 },
      { name: 'Blunt Cleaver', slotType: 'MELEE', damage: 42, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 70, duration: 0.4 },
      { name: 'Ratio Breaker: 4/4', slotType: 'SPECIAL', damage: 85, stun: 1.2, cooldown: 22, attackType: 'Normal', force: 100, duration: 1.0 },
    ]
  },
  {
    name: 'Working Overtime Mode', character: 'Salaryman (Kento Nanami)', author: 'Community',
    tags: ['nanami', 'overtime', 'wall-of-stone', 'defensive'],
    moves: [
      { name: 'Stabilize', slotType: 'SKILL', damage: 20, stun: 0.2, cooldown: 4, attackType: 'Normal', force: 30, duration: 0.3 },
      { name: 'Wall of Stone', slotType: 'SKILL', damage: 35, stun: 0.8, cooldown: 8, attackType: 'Normal', force: 55, duration: 0.7 },
      { name: 'Overtime', slotType: 'AWAKENING', damage: 50, stun: 0.6, cooldown: 10, attackType: 'Normal', force: 85, duration: 0.5 },
      { name: 'Working Overtime', slotType: 'SPECIAL', damage: 80, stun: 1.0, cooldown: 20, attackType: 'Normal', force: 95, duration: 0.9 },
    ]
  },

  // ── DISASTER PLANTS (HANAMI) ──
  {
    name: 'Disaster Root Control', character: 'Disaster Plants (Hanami)', author: 'Community',
    tags: ['hanami', 'roots', 'trap', 'control'],
    moves: [
      { name: 'Disaster Root', slotType: 'SKILL', damage: 40, stun: 1.0, cooldown: 7, attackType: 'Normal', force: 30, duration: 0.9 },
      { name: 'Surging Thorns', slotType: 'SKILL', damage: 45, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 55, duration: 0.5 },
      { name: 'Root Swarm', slotType: 'SPECIAL', damage: 65, stun: 1.2, cooldown: 18, attackType: 'Normal', force: 40, duration: 1.1 },
      { name: 'Flower Field', slotType: 'SPECIAL', damage: 75, stun: 1.5, cooldown: 25, attackType: 'Normal', force: 35, duration: 1.4 },
    ]
  },
  {
    name: 'Arm Wrap Defense Response', character: 'Disaster Plants (Hanami)', author: 'Community',
    tags: ['hanami', 'defensive', 'bud-shot', 'trap'],
    moves: [
      { name: 'Arm Wrap', slotType: 'MELEE', damage: 38, stun: 0.9, cooldown: 6, attackType: 'Normal', force: 45, duration: 0.8 },
      { name: 'Bud Shot', slotType: 'SKILL', damage: 42, stun: 0.4, cooldown: 4, attackType: 'Normal', force: 90, duration: 0.35 },
      { name: 'Defense Response', slotType: 'SKILL', damage: 25, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 35, duration: 0.3 },
      { name: 'Unwrap', slotType: 'SPECIAL', damage: 70, stun: 1.3, cooldown: 20, attackType: 'Normal', force: 80, duration: 1.1 },
    ]
  },

  // ── TRUE CANNON (RYU ISHIGORI) ──
  {
    name: 'Granite Blast Overload', character: 'True Cannon (Ryu Ishigori)', author: 'Community',
    tags: ['ryu', 'granite-blast', 'cannon', 'long-range'],
    moves: [
      { name: 'Cursed Energy Discharge', slotType: 'SKILL', damage: 50, stun: 0.5, cooldown: 5, attackType: 'Normal', force: 130, duration: 0.4 },
      { name: 'Granite Blast', slotType: 'SKILL', damage: 70, stun: 0.6, cooldown: 8, attackType: 'Normal', force: 170, duration: 0.5 },
      { name: 'Decadence', slotType: 'AWAKENING', damage: 40, stun: 0.4, cooldown: 5, attackType: 'Normal', force: 85, duration: 0.4 },
      { name: 'Every Last Drop', slotType: 'SPECIAL', damage: 95, stun: 1.0, cooldown: 22, attackType: 'Normal', force: 190, duration: 0.9 },
    ]
  },
  {
    name: 'Unsatisfied Aggro', character: 'True Cannon (Ryu Ishigori)', author: 'Community',
    tags: ['ryu', 'overheat', 'aggressive', 'second-helping'],
    moves: [
      { name: 'Overheat', slotType: 'AWAKENING', damage: 35, stun: 0.3, cooldown: 4, attackType: 'Normal', force: 100, duration: 0.3 },
      { name: 'Restyle', slotType: 'MELEE', damage: 45, stun: 0.5, cooldown: 4, attackType: 'Normal', force: 90, duration: 0.4 },
      { name: 'Fasting', slotType: 'SKILL', damage: 55, stun: 0.6, cooldown: 6, attackType: 'Normal', force: 120, duration: 0.5 },
      { name: 'Second Helping', slotType: 'SPECIAL', damage: 85, stun: 1.1, cooldown: 20, attackType: 'Normal', force: 155, duration: 1.0 },
    ]
  },

  // ── BLACK DEATH (KUROURUSHI) ──
  {
    name: 'Festering Life Sword Build', character: 'Black Death (Kurourushi)', author: 'Community',
    tags: ['kurourushi', 'festering', 'sword', 'rare'],
    moves: [
      { name: 'Festering Life Sword', slotType: 'SPECIAL', damage: 85, stun: 1.5, cooldown: 24, attackType: 'Normal', force: 110, duration: 1.3 },
      { name: 'Festering Life Sword', slotType: 'MELEE', damage: 50, stun: 0.6, cooldown: 5, attackType: 'Normal', force: 85, duration: 0.5 },
      { name: 'Festering Life Sword', slotType: 'SKILL', damage: 45, stun: 0.7, cooldown: 6, attackType: 'Normal', force: 75, duration: 0.6 },
      { name: 'Festering Life Sword', slotType: 'CHASE', damage: 35, stun: 0.3, cooldown: 3, attackType: 'Normal', force: 130, duration: 0.25 },
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
      console.log(`✓ [${entry.character}] ${entry.name} → ${id}`);
      ok++;
    } catch (e) {
      console.error(`✗ ${entry.name}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\nDone: ${ok}/${MOVESETS.length} uploaded`);
}

seed();
