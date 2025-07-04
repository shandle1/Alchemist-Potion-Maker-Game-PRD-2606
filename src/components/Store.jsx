import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShoppingCart, FiX, FiDollarSign, FiPackage, FiStar, FiZap, FiHeart, FiShield, FiTrendingUp, FiClock, FiTarget, FiAward, FiSettings, FiLock, FiBook, FiScroll } = FiIcons;

const storeItems = [
  //===RECIPE UNLOCKS - NEW SECTION FOR LEVEL 1+ PLAYERS===//
  {
    id: 'recipe_basic_strength_1',
    name: 'Basic Strength Potion Recipe',
    description: 'Learn to brew potions that enhance physical strength',
    price: 150,
    type: 'recipe',
    category: 'Enhancement',
    icon: '💪',
    effect: { type: 'recipe_unlock', recipeId: 'basic_strength_potion' },
    unlockLevel: 1,
    recipe: {
      id: 'basic_strength_potion',
      name: 'Basic Strength Potion',
      description: 'A simple elixir that temporarily boosts physical strength',
      ingredients: ['Iron Root', 'Bear Claw', 'Spring Water'],
      preparations: ['grind', 'crush', 'purify'],
      color: '#dc2626',
      level: 1,
      points: 120,
      category: 'Enhancement'
    }
  },
  {
    id: 'recipe_basic_speed_1',
    name: 'Swift Movement Recipe',
    description: 'Craft potions for enhanced speed and agility',
    price: 180,
    type: 'recipe',
    category: 'Enhancement',
    icon: '💨',
    effect: { type: 'recipe_unlock', recipeId: 'swift_movement_potion' },
    unlockLevel: 1,
    recipe: {
      id: 'swift_movement_potion',
      name: 'Swift Movement Potion',
      description: 'Increases movement speed and reflexes temporarily',
      ingredients: ['Wind Essence', 'Rabbit Foot', 'Mint Leaves'],
      preparations: ['capture', 'extract', 'crush'],
      color: '#06b6d4',
      level: 1,
      points: 130,
      category: 'Enhancement'
    }
  },
  {
    id: 'recipe_basic_invisibility_1',
    name: 'Simple Invisibility Recipe',
    description: 'Create potions for brief periods of invisibility',
    price: 220,
    type: 'recipe',
    category: 'Utility',
    icon: '👻',
    effect: { type: 'recipe_unlock', recipeId: 'simple_invisibility_potion' },
    unlockLevel: 1,
    recipe: {
      id: 'simple_invisibility_potion',
      name: 'Simple Invisibility Potion',
      description: 'Grants brief invisibility for stealth purposes',
      ingredients: ['Shadow Essence', 'Mist', 'Blue Crystal'],
      preparations: ['extract', 'capture', 'crush'],
      color: '#6b7280',
      level: 2,
      points: 180,
      category: 'Utility'
    }
  },
  // ===NEW: LOVE POTION===//
  {
    id: 'recipe_love_potion_1',
    name: 'Enchanting Love Potion Recipe',
    description: 'Master the art of brewing magical love elixirs that capture hearts',
    price: 275,
    type: 'recipe',
    category: 'Transformation',
    icon: '💖',
    effect: { type: 'recipe_unlock', recipeId: 'enchanting_love_potion' },
    unlockLevel: 1,
    recipe: {
      id: 'enchanting_love_potion',
      name: 'Enchanting Love Potion',
      description: 'A mystical elixir that inspires deep affection and romantic feelings',
      ingredients: ['Rose Petals', 'Honey', 'Moonwater'],
      preparations: ['infuse', 'heat', 'purify'],
      color: '#ec4899',
      level: 2,
      points: 220,
      category: 'Transformation'
    }
  },
  {
    id: 'recipe_fire_resistance_2',
    name: 'Fire Resistance Recipe',
    description: 'Brew potions that protect against fire damage',
    price: 300,
    type: 'recipe',
    category: 'Elemental',
    icon: '🔥',
    effect: { type: 'recipe_unlock', recipeId: 'fire_resistance_potion' },
    unlockLevel: 2,
    recipe: {
      id: 'fire_resistance_potion',
      name: 'Fire Resistance Potion',
      description: 'Provides protection against fire and heat',
      ingredients: ['Fire Crystal', 'Ice Essence', 'Protective Rune'],
      preparations: ['heat', 'concentrate', 'activate'],
      color: '#ef4444',
      level: 3,
      points: 250,
      category: 'Elemental'
    }
  },
  {
    id: 'recipe_night_vision_2',
    name: 'Enhanced Night Vision Recipe',
    description: 'Create advanced vision enhancement potions',
    price: 250,
    type: 'recipe',
    category: 'Utility',
    icon: '👁️',
    effect: { type: 'recipe_unlock', recipeId: 'enhanced_night_vision' },
    unlockLevel: 2,
    recipe: {
      id: 'enhanced_night_vision',
      name: 'Enhanced Night Vision Potion',
      description: 'Grants superior vision in darkness with magical sight',
      ingredients: ['Owl Eye', 'Moonbeam', 'Crystal Lens'],
      preparations: ['extract', 'capture', 'polish'],
      color: '#4b5563',
      level: 2,
      points: 200,
      category: 'Utility'
    }
  },
  {
    id: 'recipe_berserker_rage_3',
    name: 'Berserker Rage Formula',
    description: 'Learn to craft powerful combat enhancement potions',
    price: 500,
    type: 'recipe',
    category: 'Combat',
    icon: '⚔️',
    effect: { type: 'recipe_unlock', recipeId: 'berserker_rage_advanced' },
    unlockLevel: 3,
    recipe: {
      id: 'berserker_rage_advanced',
      name: 'Advanced Berserker Rage',
      description: 'Unleashes primal fury and combat prowess',
      ingredients: ['Demon Horn', 'Rage Essence', 'Warrior\'s Spirit'],
      preparations: ['forge', 'concentrate', 'channel'],
      color: '#dc2626',
      level: 3,
      points: 350,
      category: 'Combat'
    }
  },
  {
    id: 'recipe_transformation_3',
    name: 'Basic Transformation Recipe',
    description: 'Master the art of physical transformation',
    price: 600,
    type: 'recipe',
    category: 'Transformation',
    icon: '🔄',
    effect: { type: 'recipe_unlock', recipeId: 'basic_transformation' },
    unlockLevel: 3,
    recipe: {
      id: 'basic_transformation',
      name: 'Basic Transformation Potion',
      description: 'Allows minor physical alterations and changes',
      ingredients: ['Transformation Essence', 'Chameleon Skin', 'Mirror Shard'],
      preparations: ['weave', 'dissolve', 'polish'],
      color: '#059669',
      level: 3,
      points: 320,
      category: 'Transformation'
    }
  },
  {
    id: 'recipe_elemental_mastery_4',
    name: 'Elemental Mastery Scroll',
    description: 'Unlock the secrets of elemental magic potions',
    price: 800,
    type: 'recipe',
    category: 'Elemental',
    icon: '⚡',
    effect: { type: 'recipe_unlock', recipeId: 'elemental_mastery' },
    unlockLevel: 4,
    recipe: {
      id: 'elemental_mastery',
      name: 'Elemental Mastery Potion',
      description: 'Grants temporary control over multiple elements',
      ingredients: ['Fire Crystal', 'Water Crystal', 'Earth Crystal', 'Air Crystal'],
      preparations: ['balance', 'harmonize', 'unify'],
      color: '#10b981',
      level: 4,
      points: 450,
      category: 'Elemental'
    }
  },
  {
    id: 'recipe_legendary_healing_5',
    name: 'Legendary Healing Formula',
    description: 'The ultimate healing potion recipe',
    price: 1200,
    type: 'recipe',
    category: 'Healing',
    icon: '💖',
    effect: { type: 'recipe_unlock', recipeId: 'legendary_healing' },
    unlockLevel: 5,
    recipe: {
      id: 'legendary_healing',
      name: 'Legendary Healing Elixir',
      description: 'Heals any wound and grants temporary immortality',
      ingredients: ['Phoenix Tear', 'Life Essence', 'Divine Light'],
      preparations: ['sanctify', 'concentrate', 'enchant'],
      color: '#22c55e',
      level: 5,
      points: 600,
      category: 'Healing'
    }
  },
  {
    id: 'recipe_time_manipulation_6',
    name: 'Time Manipulation Manuscript',
    description: 'Master the forbidden art of temporal magic',
    price: 1500,
    type: 'recipe',
    category: 'Legendary',
    icon: '⏰',
    effect: { type: 'recipe_unlock', recipeId: 'time_manipulation' },
    unlockLevel: 6,
    recipe: {
      id: 'time_manipulation',
      name: 'Time Manipulation Potion',
      description: 'Allows limited control over the flow of time',
      ingredients: ['Time Crystal', 'Chronos Sand', 'Reality Gem'],
      preparations: ['activate', 'weave', 'enchant'],
      color: '#8b5cf6',
      level: 6,
      points: 750,
      category: 'Legendary'
    }
  },

  //===INGREDIENT PACKS===//
  // Common Ingredient Packs
  {
    id: 'common_pack_1',
    name: 'Beginner\'s Herb Kit',
    description: 'Essential herbs for starting alchemists',
    price: 100,
    type: 'ingredients',
    category: 'common',
    icon: '🌿',
    items: ['Dandelion', 'Clover', 'Lavender', 'Rosemary', 'Thyme'],
    unlockLevel: 1
  },
  {
    id: 'common_pack_2',
    name: 'Basic Materials Bundle',
    description: 'Common materials for everyday brewing',
    price: 120,
    type: 'ingredients',
    category: 'common',
    icon: '🧂',
    items: ['Salt', 'Sugar', 'Honey', 'Vinegar', 'Chalk'],
    unlockLevel: 1
  },
  // ===NEW: LOVE POTION INGREDIENT PACK===//
  {
    id: 'love_ingredients_pack',
    name: 'Romance & Love Bundle',
    description: 'Romantic ingredients perfect for love potions and enchantments',
    price: 200,
    type: 'ingredients',
    category: 'rare',
    icon: '💕',
    items: ['Rose Petals', 'Cupid\'s Arrow', 'Heart Crystal', 'Love Essence', 'Romance Herb'],
    unlockLevel: 1
  },

  // Rare Ingredient Packs
  {
    id: 'rare_pack_1',
    name: 'Rare Herb Bundle',
    description: 'A collection of 5 rare herbs for advanced potions',
    price: 250,
    type: 'ingredients',
    category: 'rare',
    icon: '🌿',
    items: ['Mystic Herb', 'Nightshade', 'Mandrake Root', 'Wolfsbane', 'Bloodroot'],
    unlockLevel: 2
  },
  {
    id: 'rare_pack_2',
    name: 'Beast Parts Collection',
    description: 'Rare animal parts from magical creatures',
    price: 300,
    type: 'ingredients',
    category: 'rare',
    icon: '🐺',
    items: ['Bear Claw', 'Wolf Tooth', 'Raven Feather', 'Bat Wing', 'Eagle Talon'],
    unlockLevel: 2
  },

  // Epic Ingredient Packs
  {
    id: 'epic_pack_1',
    name: 'Legendary Creature Bundle',
    description: 'Parts from legendary beasts and mythical creatures',
    price: 600,
    type: 'ingredients',
    category: 'epic',
    icon: '🐲',
    items: ['Phoenix Feather', 'Dragon Blood', 'Griffin Feather', 'Unicorn Hair', 'Pegasus Hair'],
    unlockLevel: 3
  },

  //===EXPERIENCE BOOSTS===//
  {
    id: 'exp_boost_small',
    name: 'Experience Elixir',
    description: 'Grants +50 experience points instantly',
    price: 150,
    type: 'boost',
    category: 'experience',
    icon: '📚',
    effect: { type: 'experience', amount: 50 },
    unlockLevel: 1
  },

  //===COIN MULTIPLIERS===//
  {
    id: 'coin_multiplier_small',
    name: 'Lucky Charm',
    description: 'Next 2 potions give 25% more coins',
    price: 200,
    type: 'boost',
    category: 'coins',
    icon: '🍀',
    effect: { type: 'coin_multiplier', amount: 1.25, duration: 2 },
    unlockLevel: 1
  },

  //===TIMING AIDS===//
  {
    id: 'timing_aid_small',
    name: 'Focus Enhancer',
    description: 'Makes timing windows 15% larger for next 3 potions',
    price: 250,
    type: 'boost',
    category: 'timing',
    icon: '🎯',
    effect: { type: 'timing_aid', amount: 1.15, duration: 3 },
    unlockLevel: 2
  }
];

function Store({ isOpen, onClose }) {
  const { state, dispatch } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [purchaseAnimation, setPurchaseAnimation] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items', icon: FiPackage },
    { id: 'recipe', name: 'Recipes', icon: FiBook },
    { id: 'ingredients', name: 'Ingredients', icon: FiHeart },
    { id: 'boost', name: 'Boosts', icon: FiZap },
    { id: 'upgrade', name: 'Upgrades', icon: FiSettings }
  ];

  const filteredItems = storeItems.filter(item => {
    if (selectedCategory === 'all') return item.unlockLevel <= state.currentLevel;
    return item.type === selectedCategory && item.unlockLevel <= state.currentLevel;
  });

  const handlePurchase = (item) => {
    if (state.score < item.price) return;

    setPurchaseAnimation(item.id);
    setTimeout(() => {
      dispatch({ type: 'PURCHASE_ITEM', payload: item });
      setPurchaseAnimation(null);
    }, 500);
  };

  const canAfford = (price) => state.score >= price;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'common': return 'border-gray-400 bg-gray-100';
      case 'rare': return 'border-blue-400 bg-blue-100';
      case 'epic': return 'border-purple-400 bg-purple-100';
      case 'legendary': return 'border-yellow-400 bg-yellow-100';
      case 'experience': return 'border-green-400 bg-green-100';
      case 'coins': return 'border-yellow-400 bg-yellow-100';
      case 'timing': return 'border-red-400 bg-red-100';
      case 'preparation': return 'border-orange-400 bg-orange-100';
      case 'combo': return 'border-pink-400 bg-pink-100';
      case 'unlock': return 'border-indigo-400 bg-indigo-100';
      case 'storage': return 'border-teal-400 bg-teal-100';
      case 'utility': return 'border-cyan-400 bg-cyan-100';
      case 'Enhancement': return 'border-red-400 bg-red-100';
      case 'Healing': return 'border-green-400 bg-green-100';
      case 'Magic': return 'border-blue-400 bg-blue-100';
      case 'Combat': return 'border-orange-400 bg-orange-100';
      case 'Elemental': return 'border-purple-400 bg-purple-100';
      case 'Transformation': return 'border-pink-400 bg-pink-100';
      case 'Legendary': return 'border-yellow-400 bg-yellow-100';
      case 'Utility': return 'border-cyan-400 bg-cyan-100';
      default: return 'border-stone-400 bg-stone-100';
    }
  };

  const getItemTypeIcon = (type, category) => {
    if (type === 'recipe') return FiBook;
    if (type === 'ingredients') return FiHeart;
    if (type === 'boost') {
      if (category === 'experience') return FiTrendingUp;
      if (category === 'coins') return FiDollarSign;
      if (category === 'timing') return FiTarget;
      return FiZap;
    }
    if (type === 'upgrade') return FiSettings;
    return FiPackage;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-stone-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-stone-700 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiShoppingCart} className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-medieval font-bold text-amber-400">
              Alchemist's Emporium
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-stone-700/50 px-4 py-2 rounded-full">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-lg">{state.score}</span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-300 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Level Progress for Recipe Unlocks */}
        {state.currentLevel >= 1 && (
          <div className="mb-6 bg-amber-900/30 rounded-lg p-4 border border-amber-700">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium">Recipe Shop Unlocked!</span>
            </div>
            <p className="text-amber-300 text-sm">
              🎉 Congratulations! You can now purchase new potion recipes to expand your alchemical knowledge. Each recipe teaches you how to craft powerful new potions with unique effects!
            </p>
          </div>
        )}

        {/* Love Potion Special Promotion */}
        <div className="mb-6 bg-pink-900/30 rounded-lg p-4 border border-pink-500">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">💖</span>
            <span className="text-pink-400 font-medium">💕 Valentine's Special - Love Potions Now Available! 💕</span>
          </div>
          <p className="text-pink-300 text-sm">
            ✨ Brew enchanting love potions to capture hearts! Perfect for romantic adventures and earning extra coins from lovestruck customers. Limited time romantic ingredient bundles also available!
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
              }`}
            >
              <SafeIcon icon={category.icon} className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Active Boosts Display */}
        {state.activeBoosts.length > 0 && (
          <div className="mb-6 bg-green-900/30 rounded-lg p-4 border border-green-700">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiZap} className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-medium">Active Boosts:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.activeBoosts.map((boost, index) => (
                <div key={index} className="bg-green-800/50 rounded-full px-3 py-1 text-green-300 text-sm">
                  {boost.type.replace('_', ' ').toUpperCase()} ({boost.duration} left)
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-stone-700 rounded-xl p-4 border-2 transition-all duration-300 ${
                canAfford(item.price)
                  ? 'border-stone-600 hover:border-amber-500'
                  : 'border-stone-600 opacity-60'
              }`}
            >
              {/* Special Love Potion Highlight */}
              {item.id === 'recipe_love_potion_1' && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  NEW!
                </div>
              )}

              {/* Item Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={getItemTypeIcon(item.type, item.category)} className="w-4 h-4 text-stone-400" />
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <h3 className="text-lg font-semibold text-amber-400 mb-2 leading-tight">{item.name}</h3>
              <p className="text-stone-300 text-sm mb-3 min-h-[40px]">{item.description}</p>

              {/* Recipe Details (for recipe items) */}
              {item.type === 'recipe' && item.recipe && (
                <div className="mb-3 p-2 bg-stone-600/50 rounded-lg">
                  <div className="text-stone-300 text-xs mb-1">
                    <strong>Recipe:</strong> {item.recipe.name}
                  </div>
                  <div className="text-stone-400 text-xs mb-1">
                    Level {item.recipe.level} • {item.recipe.points} Gold Reward
                  </div>
                  <div className="text-stone-400 text-xs">
                    Ingredients: {item.recipe.ingredients.slice(0, 2).join(', ')}
                    {item.recipe.ingredients.length > 2 && '...'}
                  </div>
                </div>
              )}

              {/* Item Contents (for ingredient packs) */}
              {item.items && (
                <div className="mb-3">
                  <div className="text-stone-400 text-xs mb-1">Contains:</div>
                  <div className="flex flex-wrap gap-1">
                    {item.items.slice(0, 3).map((ingredient, index) => (
                      <span key={index} className="bg-stone-600 text-stone-300 px-2 py-1 rounded text-xs">
                        {ingredient}
                      </span>
                    ))}
                    {item.items.length > 3 && (
                      <span className="text-stone-400 text-xs">+{item.items.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Effect Description for Boosts */}
              {(item.type === 'boost' || item.type === 'upgrade') && item.effect && (
                <div className="mb-3 p-2 bg-stone-600/50 rounded-lg">
                  <div className="text-stone-300 text-xs">
                    {item.effect.type === 'experience' && `+${item.effect.amount} XP instantly`}
                    {item.effect.type === 'coin_multiplier' && `${Math.round((item.effect.amount - 1) * 100)}% more coins for ${item.effect.duration} potions`}
                    {item.effect.type === 'timing_aid' && `${Math.round((item.effect.amount - 1) * 100)}% larger timing windows for ${item.effect.duration} potions`}
                  </div>
                </div>
              )}

              {/* Level Requirement */}
              {item.unlockLevel > 1 && (
                <div className="mb-3 flex items-center text-stone-400 text-xs">
                  <SafeIcon icon={FiLock} className="w-3 h-3 mr-1" />
                  <span>Requires Level {item.unlockLevel}</span>
                </div>
              )}

              {/* Purchase Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{item.price}</span>
                </div>
                <motion.button
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford(item.price) || purchaseAnimation === item.id}
                  whileHover={{ scale: canAfford(item.price) ? 1.05 : 1 }}
                  whileTap={{ scale: canAfford(item.price) ? 0.95 : 1 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    canAfford(item.price)
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                      : 'bg-stone-600 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {purchaseAnimation === item.id ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    >
                      <SafeIcon icon={FiShoppingCart} className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    canAfford(item.price) ? 'Buy' : 'Too Expensive'
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiPackage} className="w-16 h-16 text-stone-500 mx-auto mb-4" />
            <p className="text-stone-400 text-lg">No items available in this category yet.</p>
            <p className="text-stone-500 text-sm mt-2">Level up to unlock more items!</p>
          </div>
        )}

        {/* Store Info */}
        <div className="mt-6 bg-stone-700/50 rounded-lg p-4 border border-stone-600">
          <div className="flex items-center mb-2">
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-amber-400 mr-2" />
            <span className="text-amber-400 font-medium">Store Guide:</span>
          </div>
          <ul className="text-stone-300 text-sm space-y-1">
            <li>• <strong>Recipes:</strong> Unlock new potions to craft for customers</li>
            <li>• <strong>Ingredients:</strong> Permanently added to your collection</li>
            <li>• <strong>Boosts:</strong> Temporary advantages for multiple potions</li>
            <li>• <strong>Experience items:</strong> Grant instant XP for faster leveling</li>
            <li>• Higher level = more powerful items available</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Store;