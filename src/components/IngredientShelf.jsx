import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

function IngredientShelf() {
  const { state, dispatch } = useGame();

  const handleIngredientClick = (ingredient) => {
    if (state.selectedIngredients.length < 3) {
      dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
    }
  };

  const isIngredientSelected = (ingredient) => {
    return state.selectedIngredients.some(selected => selected.id === ingredient.id);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-100';
      case 'rare': return 'border-blue-400 bg-blue-100';
      case 'epic': return 'border-purple-400 bg-purple-100';
      case 'legendary': return 'border-yellow-400 bg-yellow-100';
      default: return 'border-gray-400 bg-gray-100';
    }
  };

  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case 'common': return 'hover:shadow-gray-300';
      case 'rare': return 'hover:shadow-blue-300';
      case 'epic': return 'hover:shadow-purple-300';
      case 'legendary': return 'hover:shadow-yellow-300';
      default: return 'hover:shadow-gray-300';
    }
  };

  // Combine base ingredients with owned ingredients from store purchases
  const allIngredients = [...state.availableIngredients, ...state.ownedIngredients];
  
  // Remove duplicates based on name and filter by level
  const uniqueIngredients = allIngredients.filter((ingredient, index, self) => {
    const firstIndex = self.findIndex(ing => ing.name === ingredient.name);
    return firstIndex === index;
  });

  // Filter ingredients based on player level
  const availableIngredients = uniqueIngredients.filter(ingredient => {
    if (ingredient.rarity === 'legendary') return state.currentLevel >= 5;
    if (ingredient.rarity === 'epic') return state.currentLevel >= 3;
    if (ingredient.rarity === 'rare') return state.currentLevel >= 2;
    return true; // common ingredients always available
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medieval font-semibold text-amber-400">
          Ingredient Shelf
        </h3>
        <div className="text-stone-400 text-sm">
          Level {state.currentLevel} Access
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {availableIngredients.map((ingredient) => (
          <motion.button
            key={`${ingredient.id}-${ingredient.name}`}
            onClick={() => handleIngredientClick(ingredient)}
            disabled={isIngredientSelected(ingredient) || state.selectedIngredients.length >= 3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${
              isIngredientSelected(ingredient)
                ? 'opacity-50 cursor-not-allowed bg-stone-600'
                : state.selectedIngredients.length >= 3
                ? 'opacity-60 cursor-not-allowed bg-stone-700'
                : `${getRarityColor(ingredient.rarity)} hover:shadow-lg ${getRarityGlow(ingredient.rarity)} ingredient-hover`
            }`}
          >
            {/* Ingredient Icon */}
            <div className="text-2xl mb-1">{ingredient.icon}</div>

            {/* Ingredient Name */}
            <div className="text-xs font-medium text-stone-800 mb-1 leading-tight">
              {ingredient.name}
            </div>

            {/* Rarity Badge */}
            <div className={`absolute top-1 right-1 px-1 py-0.5 rounded-full text-xs font-bold ${
              ingredient.rarity === 'common' ? 'bg-gray-500 text-white' :
              ingredient.rarity === 'rare' ? 'bg-blue-500 text-white' :
              ingredient.rarity === 'epic' ? 'bg-purple-500 text-white' :
              'bg-yellow-500 text-black'
            }`}>
              {ingredient.rarity.charAt(0).toUpperCase()}
            </div>

            {/* Selection Indicator */}
            {isIngredientSelected(ingredient) && (
              <div className="absolute inset-0 bg-amber-400/30 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            )}

            {/* Store Purchase Indicator */}
            {state.ownedIngredients.some(owned => owned.name === ingredient.name) && (
              <div className="absolute top-1 left-1 w-3 h-3 bg-emerald-500 rounded-full border border-white">
                <span className="sr-only">Purchased from store</span>
              </div>
            )}

            {/* Magical Shimmer Effect for Rare Items */}
            {!isIngredientSelected(ingredient) && state.selectedIngredients.length < 3 && ingredient.rarity !== 'common' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            )}

            {/* Legendary Glow Effect */}
            {ingredient.rarity === 'legendary' && !isIngredientSelected(ingredient) && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selection Counter */}
      <div className="flex items-center justify-between text-stone-400 text-sm">
        <span>{state.selectedIngredients.length}/3 ingredients selected</span>
        <span>{availableIngredients.length} ingredients available</span>
      </div>

      {/* Rarity Legend */}
      <div className="bg-stone-700/30 rounded-lg p-3 border border-stone-600">
        <div className="text-stone-300 text-xs font-medium mb-2">Rarity Guide:</div>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-stone-400">Common</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-stone-400">Rare (Lv2+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-stone-400">Epic (Lv3+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-stone-400">Legendary (Lv5+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-stone-400">Store Purchased</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientShelf;