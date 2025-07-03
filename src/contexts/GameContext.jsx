import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

// Customer pool with diverse personalities and backgrounds
const customerPool = [
  {
    name: 'Farmer Willem',
    personality: 'Humble Village Farmer',
    story: 'A hardworking farmer who tends to the village crops. He frequently gets cuts and bruises from his daily work in the fields.',
    urgency: 'low',
    payment: 'A sack of fresh vegetables and honest coin',
    preferences: ['Healing', 'Enhancement']
  },
  {
    name: 'Sir Gareth the Bold',
    personality: 'Veteran Knight',
    story: 'A battle-scarred knight who has served the realm for twenty years. He bears many wounds from countless battles against monsters and bandits.',
    urgency: 'high',
    payment: 'A knight\'s purse and a blessing from the royal court',
    preferences: ['Healing', 'Enhancement', 'Combat']
  },
  {
    name: 'Mira the Herbalist',
    personality: 'Wise Village Healer',
    story: 'An experienced herbalist who often ventures into dangerous forests to gather rare plants. She has been poisoned by toxic plants multiple times.',
    urgency: 'medium',
    payment: 'Rare herbs from the deep forest and knowledge of secret locations',
    preferences: ['Healing', 'Magic', 'Utility']
  },
  {
    name: 'Elara the Apprentice',
    personality: 'Eager Young Mage',
    story: 'A dedicated apprentice mage studying at the local magic academy. She often exhausts her magical energy during practice sessions.',
    urgency: 'medium',
    payment: 'Academy scrolls and a young mage\'s gratitude',
    preferences: ['Magic', 'Enhancement']
  },
  {
    name: 'Archmage Theron',
    personality: 'Ancient Powerful Wizard',
    story: 'A legendary archmage who has lived for centuries. He seeks to enhance his already formidable powers for crucial magical rituals.',
    urgency: 'critical',
    payment: 'Ancient magical artifacts and the favor of the Arcane Council',
    preferences: ['Magic', 'Legendary']
  },
  {
    name: 'Captain Lydia Stormwind',
    personality: 'Battle-Hardened Mage Hunter',
    story: 'A captain of the Royal Guard who specializes in hunting rogue mages. She faces magical threats daily and needs protection.',
    urgency: 'high',
    payment: 'Royal commission and protection of the Crown',
    preferences: ['Magic', 'Combat', 'Enhancement']
  },
  {
    name: 'Magnus the Blacksmith',
    personality: 'Proud Master Craftsman',
    story: 'The village\'s master blacksmith who takes pride in his strength. He needs to forge legendary weapons but lacks the physical power required.',
    urgency: 'medium',
    payment: 'A masterwork weapon forged especially for you',
    preferences: ['Enhancement', 'Transformation']
  },
  {
    name: 'Whisper',
    personality: 'Mysterious Spy',
    story: 'A shadowy figure who works for unknown masters. Their identity and motives remain hidden behind a dark hood.',
    urgency: 'critical',
    payment: 'A pouch of rare gems and silence about this transaction',
    preferences: ['Utility', 'Transformation']
  },
  {
    name: 'Brother Aldric',
    personality: 'Devoted Temple Monk',
    story: 'A peaceful monk from the Temple of Light who tends to the sick and wounded. He seeks remedies for his fellow brothers and the local community.',
    urgency: 'low',
    payment: 'Blessed relics and prayers for your success',
    preferences: ['Healing', 'Magic']
  },
  {
    name: 'Lady Evangeline',
    personality: 'Noble Court Lady',
    story: 'An elegant noblewoman known for her beauty and intelligence. She seeks potions for court intrigue and maintaining her status among the aristocracy.',
    urgency: 'medium',
    payment: 'Noble connections and rare court luxuries',
    preferences: ['Transformation', 'Enhancement', 'Utility']
  },
  {
    name: 'Thorek Ironbeard',
    personality: 'Dwarven Warrior',
    story: 'A gruff but honorable dwarf warrior who has fought in the deep mountain wars. His clan depends on him to stay strong and healthy.',
    urgency: 'medium',
    payment: 'Dwarven-forged tools and mountain crystals',
    preferences: ['Healing', 'Enhancement', 'Combat']
  },
  {
    name: 'Seraphina the Oracle',
    personality: 'Mystical Fortune Teller',
    story: 'A mysterious oracle who sees glimpses of the future. She seeks potions to enhance her visions and protect herself from dark prophecies.',
    urgency: 'high',
    payment: 'Prophetic knowledge and mystical artifacts',
    preferences: ['Magic', 'Transformation', 'Utility']
  },
  {
    name: 'Captain Roderick',
    personality: 'Seasoned Ship Captain',
    story: 'A weathered sea captain who has sailed treacherous waters for decades. He needs potions for his crew\'s long voyages and dangerous encounters.',
    urgency: 'medium',
    payment: 'Exotic treasures from distant lands',
    preferences: ['Healing', 'Enhancement', 'Utility']
  },
  {
    name: 'Zara the Merchant',
    personality: 'Shrewd Traveling Trader',
    story: 'A cunning merchant who travels dangerous trade routes. She needs potions for protection and to maintain her edge in negotiations.',
    urgency: 'low',
    payment: 'Rare trade goods and profitable business connections',
    preferences: ['Utility', 'Enhancement', 'Healing']
  },
  {
    name: 'Master Chen',
    personality: 'Wise Martial Artist',
    story: 'An elderly martial arts master who trains young warriors. He seeks potions to enhance training and heal students injured in practice.',
    urgency: 'low',
    payment: 'Ancient fighting techniques and meditation wisdom',
    preferences: ['Healing', 'Enhancement']
  },
  {
    name: 'Isabella the Bard',
    personality: 'Charismatic Traveling Performer',
    story: 'A talented bard who performs in taverns and noble courts alike. She needs potions to enhance her performances and charm her audiences.',
    urgency: 'medium',
    payment: 'Epic songs of your deeds and entertainment connections',
    preferences: ['Enhancement', 'Transformation', 'Utility']
  }
];

// Request templates based on potion categories
const requestTemplates = {
  Healing: [
    "I've been injured and need something to heal my wounds quickly.",
    "My work often leaves me battered and bruised - I need reliable healing.",
    "The dangers I face require potent healing magic.",
    "I seek a remedy for injuries that won't heal naturally.",
    "My condition requires immediate healing intervention."
  ],
  Magic: [
    "My magical powers are waning and need restoration.",
    "I require enhancement of my arcane abilities.",
    "The ritual I must perform demands increased magical potency.",
    "My spells have been failing - I need magical aid.",
    "The magical energies around me are unstable - I need protection."
  ],
  Enhancement: [
    "I need to become stronger for the challenges ahead.",
    "My physical abilities are not sufficient for my tasks.",
    "The work I do requires superhuman strength and endurance.",
    "I must enhance my capabilities beyond normal limits.",
    "My duties demand peak physical performance."
  ],
  Utility: [
    "I need special abilities for a delicate mission.",
    "The task ahead requires unique capabilities.",
    "My work demands tools that only magic can provide.",
    "I seek abilities that will give me an advantage.",
    "The situation calls for unconventional solutions."
  ],
  Transformation: [
    "I need to change my appearance for important reasons.",
    "My current form is not suitable for what I must do.",
    "The mission requires me to become something different.",
    "I seek transformation to achieve my goals.",
    "My circumstances demand a radical change."
  ],
  Combat: [
    "Battle awaits and I must be prepared for war.",
    "The enemies I face are too powerful for normal weapons.",
    "Combat enhancement is crucial for my survival.",
    "I need an edge in the fights to come.",
    "The battlefield demands supernatural prowess."
  ]
};

const initialState = {
  user: null,
  isAuthenticated: false,
  currentLevel: 1,
  score: 0,
  experience: 0,
  showTutorial: false,
  currentRecipe: null,
  selectedIngredients: [],
  preparedIngredients: [],
  gamePhase: 'auth',
  recipes: [
    {
      id: 1,
      name: 'Basic Healing Potion',
      description: 'A simple healing elixir to restore minor wounds and vitality.',
      ingredients: ['Red Mushroom', 'Spring Water', 'Mint Leaves'],
      preparations: ['chop', 'purify', 'crush'],
      color: '#ef4444',
      level: 1,
      points: 100,
      category: 'Healing'
    },
    {
      id: 2,
      name: 'Greater Healing Draught',
      description: 'A powerful healing potion that mends serious injuries.',
      ingredients: ['Phoenix Feather', 'Dragon Blood', 'Golden Root'],
      preparations: ['pluck', 'heat', 'grind'],
      color: '#dc2626',
      level: 3,
      points: 300,
      category: 'Healing'
    },
    {
      id: 3,
      name: 'Antidote Elixir',
      description: 'Neutralizes most common poisons and toxins.',
      ingredients: ['Cleansing Herb', 'Pure Water', 'Silver Dust'],
      preparations: ['crush', 'purify', 'dissolve'],
      color: '#16a34a',
      level: 2,
      points: 150,
      category: 'Healing'
    },
    {
      id: 4,
      name: 'Mana Restoration Potion',
      description: 'Restores magical energy and mental focus.',
      ingredients: ['Blue Crystal', 'Moonwater', 'Sage'],
      preparations: ['crush', 'purify', 'burn'],
      color: '#3b82f6',
      level: 1,
      points: 120,
      category: 'Magic'
    },
    {
      id: 5,
      name: 'Arcane Amplifier',
      description: 'Temporarily enhances magical abilities and spell power.',
      ingredients: ['Starlight Essence', 'Void Crystal', 'Mystic Herb'],
      preparations: ['concentrate', 'enchant', 'infuse'],
      color: '#8b5cf6',
      level: 4,
      points: 400,
      category: 'Magic'
    },
    {
      id: 6,
      name: 'Mage Shield Brew',
      description: 'Creates a protective barrier against magical attacks.',
      ingredients: ['Barrier Stone', 'Protective Rune', 'Moonwater'],
      preparations: ['polish', 'activate', 'purify'],
      color: '#06b6d4',
      level: 3,
      points: 250,
      category: 'Magic'
    },
    {
      id: 7,
      name: 'Strength Enhancement Elixir',
      description: 'Dramatically increases physical strength and endurance.',
      ingredients: ['Giant\'s Blood', 'Iron Root', 'Bear Claw'],
      preparations: ['heat', 'grind', 'crush'],
      color: '#dc2626',
      level: 3,
      points: 280,
      category: 'Enhancement'
    },
    {
      id: 8,
      name: 'Invisibility Draught',
      description: 'Grants temporary invisibility for stealth missions.',
      ingredients: ['Shadow Essence', 'Chameleon Skin', 'Void Crystal'],
      preparations: ['extract', 'dissolve', 'enchant'],
      color: '#6b7280',
      level: 4,
      points: 350,
      category: 'Utility'
    }
  ],
  availableIngredients: [
    //===== COMMON INGREDIENTS (Level 1+ - Always Available) =====//
    // Basic Herbs & Plants
    { id: 1, name: 'Red Mushroom', icon: '🍄', rarity: 'common', type: 'solid' },
    { id: 2, name: 'Mint Leaves', icon: '🌿', rarity: 'common', type: 'solid' },
    { id: 3, name: 'Sage', icon: '🌱', rarity: 'common', type: 'solid' },
    { id: 4, name: 'Dandelion', icon: '🌼', rarity: 'common', type: 'solid' },
    { id: 5, name: 'Clover', icon: '🍀', rarity: 'common', type: 'solid' },
    { id: 6, name: 'Lavender', icon: '💜', rarity: 'common', type: 'solid' },
    { id: 7, name: 'Rosemary', icon: '🌿', rarity: 'common', type: 'solid' },
    { id: 8, name: 'Thyme', icon: '🌱', rarity: 'common', type: 'solid' },
    { id: 9, name: 'Parsley', icon: '🌿', rarity: 'common', type: 'solid' },
    { id: 10, name: 'Basil', icon: '🌱', rarity: 'common', type: 'solid' },

    // Basic Liquids
    { id: 11, name: 'Spring Water', icon: '💧', rarity: 'common', type: 'liquid' },
    { id: 12, name: 'Pure Water', icon: '💎', rarity: 'common', type: 'liquid' },
    { id: 13, name: 'Honey', icon: '🍯', rarity: 'common', type: 'liquid' },
    { id: 14, name: 'Milk', icon: '🥛', rarity: 'common', type: 'liquid' },
    { id: 15, name: 'Olive Oil', icon: '🫒', rarity: 'common', type: 'liquid' },
    { id: 16, name: 'Vinegar', icon: '🍶', rarity: 'common', type: 'liquid' },
    { id: 17, name: 'Wine', icon: '🍷', rarity: 'common', type: 'liquid' },
    { id: 18, name: 'Ale', icon: '🍺', rarity: 'common', type: 'liquid' },

    // Basic Powders & Dusts
    { id: 19, name: 'Salt', icon: '🧂', rarity: 'common', type: 'powder' },
    { id: 20, name: 'Sugar', icon: '🍬', rarity: 'common', type: 'powder' },
    { id: 21, name: 'Flour', icon: '🌾', rarity: 'common', type: 'powder' },
    { id: 22, name: 'Ash', icon: '🪶', rarity: 'common', type: 'powder' },
    { id: 23, name: 'Iron Dust', icon: '⚡', rarity: 'common', type: 'powder' },
    { id: 24, name: 'Silver Dust', icon: '✨', rarity: 'common', type: 'powder' },
    { id: 25, name: 'Bone Dust', icon: '🦴', rarity: 'common', type: 'powder' },
    { id: 26, name: 'Chalk', icon: '⚪', rarity: 'common', type: 'powder' },

    // Basic Animal Parts
    { id: 27, name: 'Rabbit Foot', icon: '🐰', rarity: 'common', type: 'solid' },
    { id: 28, name: 'Fish Scale', icon: '🐟', rarity: 'common', type: 'solid' },
    { id: 29, name: 'Owl Eye', icon: '🦉', rarity: 'common', type: 'solid' },
    { id: 30, name: 'Feather', icon: '🪶', rarity: 'common', type: 'solid' },
    { id: 31, name: 'Egg Shell', icon: '🥚', rarity: 'common', type: 'solid' },
    { id: 32, name: 'Wool', icon: '🐑', rarity: 'common', type: 'solid' },
    { id: 33, name: 'Leather', icon: '🦬', rarity: 'common', type: 'solid' },
    { id: 34, name: 'Antler', icon: '🦌', rarity: 'common', type: 'solid' },

    // Basic Minerals
    { id: 35, name: 'Quartz', icon: '💎', rarity: 'common', type: 'solid' },
    { id: 36, name: 'Flint', icon: '🪨', rarity: 'common', type: 'solid' },
    { id: 37, name: 'Clay', icon: '🏺', rarity: 'common', type: 'solid' },
    { id: 38, name: 'Sand', icon: '🏜️', rarity: 'common', type: 'powder' },
    { id: 39, name: 'Pebble', icon: '🪨', rarity: 'common', type: 'solid' },
    { id: 40, name: 'Copper', icon: '🟤', rarity: 'common', type: 'solid' },

    //===== RECIPE-REQUIRED INGREDIENTS (Always Available) =====//
    // These are needed for current recipes so they're available from level 1
    { id: 41, name: 'Blue Crystal', icon: '💎', rarity: 'common', type: 'solid' }, // For Mana Restoration Potion
    { id: 42, name: 'Moonwater', icon: '🌙', rarity: 'common', type: 'liquid' }, // For Mana Restoration Potion & Mage Shield Brew
    { id: 44, name: 'Cleansing Herb', icon: '🌿', rarity: 'common', type: 'solid' }, // For Antidote Elixir

    //===== RARE INGREDIENTS (Level 2+) =====//
    // Rare Herbs & Plants
    { id: 43, name: 'Fire Root', icon: '🔥', rarity: 'rare', type: 'solid' },
    { id: 45, name: 'Golden Root', icon: '🌟', rarity: 'rare', type: 'solid' },
    { id: 46, name: 'Mystic Herb', icon: '🌿', rarity: 'rare', type: 'solid' },
    { id: 47, name: 'Nightshade', icon: '🫐', rarity: 'rare', type: 'solid' },
    { id: 48, name: 'Mandrake Root', icon: '🌱', rarity: 'rare', type: 'solid' },
    { id: 49, name: 'Wolfsbane', icon: '🐺', rarity: 'rare', type: 'solid' },
    { id: 50, name: 'Bloodroot', icon: '🩸', rarity: 'rare', type: 'solid' },
    { id: 51, name: 'Ghostweed', icon: '👻', rarity: 'rare', type: 'solid' },
    { id: 52, name: 'Frostbloom', icon: '❄️', rarity: 'rare', type: 'solid' },
    { id: 53, name: 'Sunflower', icon: '🌻', rarity: 'rare', type: 'solid' },
    { id: 54, name: 'Moonflower', icon: '🌙', rarity: 'rare', type: 'solid' },
    { id: 55, name: 'Stargrass', icon: '✨', rarity: 'rare', type: 'solid' },

    // Rare Animal Parts
    { id: 56, name: 'Bear Claw', icon: '🐻', rarity: 'rare', type: 'solid' },
    { id: 57, name: 'Wolf Tooth', icon: '🐺', rarity: 'rare', type: 'solid' },
    { id: 58, name: 'Raven Feather', icon: '🐦‍⬛', rarity: 'rare', type: 'solid' },
    { id: 59, name: 'Bat Wing', icon: '🦇', rarity: 'rare', type: 'solid' },
    { id: 60, name: 'Spider Silk', icon: '🕷️', rarity: 'rare', type: 'solid' },
    { id: 61, name: 'Viper Venom', icon: '🐍', rarity: 'rare', type: 'liquid' },
    { id: 62, name: 'Shark Tooth', icon: '🦈', rarity: 'rare', type: 'solid' },
    { id: 63, name: 'Eagle Talon', icon: '🦅', rarity: 'rare', type: 'solid' },
    { id: 64, name: 'Unicorn Hair', icon: '🦄', rarity: 'rare', type: 'solid' },
    { id: 65, name: 'Turtle Shell', icon: '🐢', rarity: 'rare', type: 'solid' },

    // Rare Minerals & Crystals
    { id: 66, name: 'Amethyst', icon: '💜', rarity: 'rare', type: 'solid' },
    { id: 67, name: 'Emerald', icon: '💚', rarity: 'rare', type: 'solid' },
    { id: 68, name: 'Ruby', icon: '❤️', rarity: 'rare', type: 'solid' },
    { id: 69, name: 'Sapphire', icon: '💙', rarity: 'rare', type: 'solid' },
    { id: 70, name: 'Topaz', icon: '💛', rarity: 'rare', type: 'solid' },
    { id: 71, name: 'Opal', icon: '🌈', rarity: 'rare', type: 'solid' },
    { id: 72, name: 'Obsidian', icon: '⚫', rarity: 'rare', type: 'solid' },
    { id: 73, name: 'Mithril', icon: '🥈', rarity: 'rare', type: 'solid' },
    { id: 74, name: 'Adamantine', icon: '💎', rarity: 'rare', type: 'solid' },
    { id: 75, name: 'Barrier Stone', icon: '🛡️', rarity: 'rare', type: 'solid' },
    { id: 76, name: 'Iron Root', icon: '⚙️', rarity: 'rare', type: 'solid' },

    // Rare Essences & Liquids
    { id: 77, name: 'Wind Essence', icon: '💨', rarity: 'rare', type: 'gas' },
    { id: 78, name: 'Shadow Essence', icon: '🌑', rarity: 'rare', type: 'gas' },
    { id: 79, name: 'Lightning Shard', icon: '⚡', rarity: 'rare', type: 'solid' },
    { id: 80, name: 'Kelp Extract', icon: '🌊', rarity: 'rare', type: 'liquid' },
    { id: 81, name: 'Crystal Lens', icon: '🔍', rarity: 'rare', type: 'solid' },
    { id: 82, name: 'Dew Drop', icon: '💧', rarity: 'rare', type: 'liquid' },
    { id: 83, name: 'Mist', icon: '🌫️', rarity: 'rare', type: 'gas' },
    { id: 84, name: 'Frost', icon: '❄️', rarity: 'rare', type: 'solid' },
    { id: 85, name: 'Smoke', icon: '💨', rarity: 'rare', type: 'gas' },

    //===== EPIC INGREDIENTS (Level 3+) =====//
    // Epic Creature Parts
    { id: 86, name: 'Phoenix Feather', icon: '🔥', rarity: 'epic', type: 'solid' },
    { id: 87, name: 'Dragon Blood', icon: '🐲', rarity: 'epic', type: 'liquid' },
    { id: 88, name: 'Giant\'s Blood', icon: '🏔️', rarity: 'epic', type: 'liquid' },
    { id: 89, name: 'Chameleon Skin', icon: '🦎', rarity: 'epic', type: 'solid' },
    { id: 90, name: 'Kraken Ink', icon: '🐙', rarity: 'epic', type: 'liquid' },
    { id: 91, name: 'Griffin Feather', icon: '🦅', rarity: 'epic', type: 'solid' },
    { id: 92, name: 'Hydra Scale', icon: '🐍', rarity: 'epic', type: 'solid' },
    { id: 93, name: 'Pegasus Hair', icon: '🦄', rarity: 'epic', type: 'solid' },
    { id: 94, name: 'Sphinx Claw', icon: '🦁', rarity: 'epic', type: 'solid' },
    { id: 95, name: 'Basilisk Eye', icon: '👁️', rarity: 'epic', type: 'solid' },
    { id: 96, name: 'Wyvern Tooth', icon: '🐉', rarity: 'epic', type: 'solid' },
    { id: 97, name: 'Demon Horn', icon: '👹', rarity: 'epic', type: 'solid' },
    { id: 98, name: 'Angel Wing', icon: '👼', rarity: 'epic', type: 'solid' },
    { id: 99, name: 'Minotaur Hide', icon: '🐂', rarity: 'epic', type: 'solid' },
    { id: 100, name: 'Centaur Hair', icon: '🏹', rarity: 'epic', type: 'solid' },

    // Epic Crystals & Stones
    { id: 101, name: 'Starlight Essence', icon: '✨', rarity: 'epic', type: 'gas' },
    { id: 102, name: 'Void Crystal', icon: '🌌', rarity: 'epic', type: 'solid' },
    { id: 103, name: 'Protective Rune', icon: '🔮', rarity: 'epic', type: 'solid' },
    { id: 104, name: 'Ghost Essence', icon: '👻', rarity: 'epic', type: 'gas' },
    { id: 105, name: 'Frost Crystal', icon: '❄️', rarity: 'epic', type: 'solid' },
    { id: 106, name: 'Thunder Stone', icon: '⚡', rarity: 'epic', type: 'solid' },
    { id: 107, name: 'Fire Crystal', icon: '🔥', rarity: 'epic', type: 'solid' },
    { id: 108, name: 'Water Crystal', icon: '💧', rarity: 'epic', type: 'solid' },
    { id: 109, name: 'Earth Crystal', icon: '🌍', rarity: 'epic', type: 'solid' },
    { id: 110, name: 'Air Crystal', icon: '💨', rarity: 'epic', type: 'solid' },
    { id: 111, name: 'Shadow Crystal', icon: '🌑', rarity: 'epic', type: 'solid' },
    { id: 112, name: 'Light Crystal', icon: '☀️', rarity: 'epic', type: 'solid' },
    { id: 113, name: 'Soul Stone', icon: '💀', rarity: 'epic', type: 'solid' },
    { id: 114, name: 'Mind Crystal', icon: '🧠', rarity: 'epic', type: 'solid' },
    { id: 115, name: 'Heart Stone', icon: '💖', rarity: 'epic', type: 'solid' },

    // Epic Magical Items
    { id: 116, name: 'Wizard\'s Beard', icon: '🧙', rarity: 'epic', type: 'solid' },
    { id: 117, name: 'Fairy Dust', icon: '🧚', rarity: 'epic', type: 'powder' },
    { id: 118, name: 'Elf Tear', icon: '🧝', rarity: 'epic', type: 'liquid' },
    { id: 119, name: 'Dwarf Ale', icon: '🍺', rarity: 'epic', type: 'liquid' },
    { id: 120, name: 'Mermaid Scale', icon: '🧜', rarity: 'epic', type: 'solid' },
    { id: 121, name: 'Vampire Fang', icon: '🧛', rarity: 'epic', type: 'solid' },
    { id: 122, name: 'Werewolf Fur', icon: '🐺', rarity: 'epic', type: 'solid' },
    { id: 123, name: 'Troll Blood', icon: '🧌', rarity: 'epic', type: 'liquid' },
    { id: 124, name: 'Goblin Ear', icon: '👺', rarity: 'epic', type: 'solid' },
    { id: 125, name: 'Orc Tusk', icon: '🧌', rarity: 'epic', type: 'solid' },

    //===== LEGENDARY INGREDIENTS (Level 5+) =====//
    // Divine & Celestial
    { id: 126, name: 'Phoenix Tear', icon: '💧', rarity: 'legendary', type: 'liquid' },
    { id: 127, name: 'Dragon Scale', icon: '🐲', rarity: 'legendary', type: 'solid' },
    { id: 128, name: 'Eternal Flower', icon: '🌸', rarity: 'legendary', type: 'solid' },
    { id: 129, name: 'Life Essence', icon: '💖', rarity: 'legendary', type: 'gas' },
    { id: 130, name: 'Oracle\'s Eye', icon: '👁️', rarity: 'legendary', type: 'solid' },
    { id: 131, name: 'Wisdom Crystal', icon: '💎', rarity: 'legendary', type: 'solid' },
    { id: 132, name: 'Chronos Sand', icon: '⏳', rarity: 'legendary', type: 'powder' },
    { id: 133, name: 'Time Crystal', icon: '⏰', rarity: 'legendary', type: 'solid' },
    { id: 134, name: 'Angel Feather', icon: '🪶', rarity: 'legendary', type: 'solid' },
    { id: 135, name: 'Holy Water', icon: '✨', rarity: 'legendary', type: 'liquid' },
    { id: 136, name: 'Divine Light', icon: '☀️', rarity: 'legendary', type: 'gas' },
    { id: 137, name: 'Cosmic Dust', icon: '🌌', rarity: 'legendary', type: 'powder' },
    { id: 138, name: 'Stardust', icon: '⭐', rarity: 'legendary', type: 'powder' },
    { id: 139, name: 'Moonbeam', icon: '🌙', rarity: 'legendary', type: 'gas' },
    { id: 140, name: 'Sunfire', icon: '☀️', rarity: 'legendary', type: 'gas' },
    { id: 141, name: 'Void Essence', icon: '🕳️', rarity: 'legendary', type: 'gas' },
    { id: 142, name: 'Creation Spark', icon: '✨', rarity: 'legendary', type: 'gas' },
    { id: 143, name: 'Destruction Ash', icon: '💀', rarity: 'legendary', type: 'powder' },
    { id: 144, name: 'Infinity Stone', icon: '♾️', rarity: 'legendary', type: 'solid' },
    { id: 145, name: 'Reality Gem', icon: '💎', rarity: 'legendary', type: 'solid' },
    { id: 146, name: 'Fate Thread', icon: '🧵', rarity: 'legendary', type: 'solid' },
    { id: 147, name: 'Destiny Crystal', icon: '🔮', rarity: 'legendary', type: 'solid' },
    { id: 148, name: 'Miracle Dew', icon: '💧', rarity: 'legendary', type: 'liquid' },
    { id: 149, name: 'Eternal Flame', icon: '🔥', rarity: 'legendary', type: 'gas' },
    { id: 150, name: 'Primordial Water', icon: '🌊', rarity: 'legendary', type: 'liquid' },

    // Ancient & Mythical
    { id: 151, name: 'World Tree Sap', icon: '🌳', rarity: 'legendary', type: 'liquid' },
    { id: 152, name: 'Leviathan Scale', icon: '🐋', rarity: 'legendary', type: 'solid' },
    { id: 153, name: 'Titan\'s Blood', icon: '⚡', rarity: 'legendary', type: 'liquid' },
    { id: 154, name: 'God\'s Breath', icon: '💨', rarity: 'legendary', type: 'gas' },
    { id: 155, name: 'Primal Essence', icon: '🌟', rarity: 'legendary', type: 'gas' },
    { id: 156, name: 'Ancient Rune', icon: '📜', rarity: 'legendary', type: 'solid' },
    { id: 157, name: 'Forbidden Fruit', icon: '🍎', rarity: 'legendary', type: 'solid' },
    { id: 158, name: 'Ambrosia', icon: '🍯', rarity: 'legendary', type: 'liquid' },
    { id: 159, name: 'Nectar', icon: '🌺', rarity: 'legendary', type: 'liquid' },
    { id: 160, name: 'Philosopher\'s Stone', icon: '🪨', rarity: 'legendary', type: 'solid' }
  ]
};

// Function to generate a customer request based on their personality and the potion category
function generateCustomerRequest(customer, category, potionName) {
  const templates = requestTemplates[category] || requestTemplates.Utility;
  const baseRequest = templates[Math.floor(Math.random() * templates.length)];
  
  const personalizedIntros = [
    `Greetings, Master Alchemist! I am ${customer.name}.`,
    `Good day! My name is ${customer.name}, and I have urgent need of your services.`,
    `Hail, renowned Alchemist! I am ${customer.name}, and I come seeking your expertise.`,
    `Master of the arcane arts, I am ${customer.name}.`,
    `Esteemed Alchemist, I am ${customer.name}, and time is of the essence.`
  ];
  
  const endings = [
    `Can you craft a ${potionName} for me?`,
    `I seek a ${potionName} of the highest quality.`,
    `Would you be willing to brew a ${potionName}?`,
    `I have heard of your skill - can you create a ${potionName}?`,
    `Please, I need a ${potionName} as soon as possible.`
  ];
  
  const intro = personalizedIntros[Math.floor(Math.random() * personalizedIntros.length)];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  
  return `${intro} ${customer.story} ${baseRequest} ${ending}`;
}

// Function to assign a random customer to a recipe
function assignRandomCustomer(recipe) {
  // Filter customers who would be interested in this category
  const interestedCustomers = customerPool.filter(customer => 
    customer.preferences.includes(recipe.category) || 
    customer.preferences.includes('Utility') // Utility customers take any potion
  );
  
  // If no specific match, allow any customer
  const availableCustomers = interestedCustomers.length > 0 ? interestedCustomers : customerPool;
  
  // Select random customer
  const selectedCustomer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
  
  // Generate personalized request
  const request = generateCustomerRequest(selectedCustomer, recipe.category, recipe.name);
  
  return {
    ...selectedCustomer,
    request
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        gamePhase: action.payload.isFirstTime ? 'tutorial' : 'playing',
        showTutorial: action.payload.isFirstTime
      };

    case 'LOGOUT':
      return {
        ...initialState,
        gamePhase: 'auth'
      };

    case 'START_TUTORIAL':
      return {
        ...state,
        showTutorial: true,
        gamePhase: 'tutorial'
      };

    case 'COMPLETE_TUTORIAL':
      return {
        ...state,
        showTutorial: false,
        gamePhase: 'playing'
      };

    case 'SELECT_RECIPE':
      // Assign a random customer to the recipe
      const recipeWithCustomer = {
        ...action.payload,
        customer: assignRandomCustomer(action.payload)
      };
      return {
        ...state,
        currentRecipe: recipeWithCustomer,
        selectedIngredients: [],
        preparedIngredients: []
      };

    case 'ADD_INGREDIENT':
      if (state.selectedIngredients.length >= 3) return state;
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload]
      };

    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (_, index) => index !== action.payload
        )
      };

    case 'START_PREPARATION':
      return {
        ...state,
        gamePhase: 'preparing'
      };

    case 'PREPARE_INGREDIENT':
      const updatedPrepared = [...state.preparedIngredients];
      const existingIndex = updatedPrepared.findIndex(
        p => p.ingredientIndex === action.payload.ingredientIndex
      );
      
      if (existingIndex >= 0) {
        updatedPrepared[existingIndex] = action.payload;
      } else {
        updatedPrepared.push(action.payload);
      }
      
      return {
        ...state,
        preparedIngredients: updatedPrepared
      };

    case 'CRAFT_POTION':
      const recipe = state.currentRecipe;
      
      // Check if ingredients match exactly (correct ingredients in correct order)
      const ingredientsMatch = recipe.ingredients.length === state.selectedIngredients.length &&
        recipe.ingredients.every((ingredient, index) => 
          state.selectedIngredients[index] && state.selectedIngredients[index].name === ingredient
        );
      
      // Check if preparations match exactly
      const preparationsMatch = recipe.preparations.length === state.preparedIngredients.length &&
        recipe.preparations.every((requiredPreparation, recipeIndex) => {
          const preparation = state.preparedIngredients.find(prep => 
            prep.ingredientIndex === recipeIndex && prep.method === requiredPreparation
          );
          return preparation !== undefined;
        });
      
      // Calculate score based on both ingredients and preparations
      let score = 0;
      
      // Ingredients scoring (50% of total)
      if (ingredientsMatch) {
        score += 50;
      } else {
        // Partial credit for having some correct ingredients in correct positions
        let correctCount = 0;
        recipe.ingredients.forEach((ingredient, index) => {
          if (state.selectedIngredients[index] && state.selectedIngredients[index].name === ingredient) {
            correctCount++;
          }
        });
        score += Math.floor((correctCount / recipe.ingredients.length) * 50);
      }
      
      // Preparation scoring (50% of total)
      if (preparationsMatch) {
        score += 50;
      } else {
        // Partial credit for correct preparations
        let correctPrepCount = 0;
        recipe.preparations.forEach((requiredPrep, index) => {
          const prep = state.preparedIngredients.find(p => 
            p.ingredientIndex === index && p.method === requiredPrep
          );
          if (prep) correctPrepCount++;
        });
        score += Math.floor((correctPrepCount / recipe.preparations.length) * 50);
      }
      
      const percentageScore = Math.max(0, Math.min(100, score));
      const points = Math.floor(recipe.points * (percentageScore / 100));
      const bonusPoints = percentageScore === 100 && recipe.level >= 5 ? Math.floor(recipe.points * 0.2) : 0;
      const totalPoints = points + bonusPoints;
      
      console.log('🎯 CRAFT_POTION Debug:', {
        selectedIngredients: state.selectedIngredients.map(ing => ing.name),
        requiredIngredients: recipe.ingredients,
        ingredientsMatch,
        preparedIngredients: state.preparedIngredients,
        requiredPreparations: recipe.preparations,
        preparationsMatch,
        percentageScore,
        points,
        bonusPoints,
        totalPoints
      });
      
      return {
        ...state,
        score: state.score + totalPoints,
        experience: state.experience + totalPoints,
        currentLevel: Math.floor((state.experience + totalPoints) / 500) + 1,
        selectedIngredients: [],
        preparedIngredients: [],
        gamePhase: 'completed'
      };

    case 'NEXT_RECIPE':
      const availableRecipes = state.recipes.filter(r => r.level <= state.currentLevel);
      const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
      
      // Assign a new random customer to the new recipe
      const newRecipeWithCustomer = {
        ...randomRecipe,
        customer: assignRandomCustomer(randomRecipe)
      };
      
      return {
        ...state,
        currentRecipe: newRecipeWithCustomer,
        gamePhase: 'playing'
      };

    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload
      };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('alchemist-game-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.user) {
          dispatch({ type: 'LOGIN', payload: parsed.user });
        }
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('alchemist-game-state', JSON.stringify({
        user: state.user,
        currentLevel: state.currentLevel,
        score: state.score,
        experience: state.experience
      }));
    }
  }, [state.isAuthenticated, state.user, state.currentLevel, state.score, state.experience]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}