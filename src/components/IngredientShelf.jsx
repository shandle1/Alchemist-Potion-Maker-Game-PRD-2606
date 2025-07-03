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

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medieval font-semibold text-amber-400">
        Ingredient Shelf
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {state.availableIngredients.map((ingredient) => (
          <motion.button
            key={ingredient.id}
            onClick={() => handleIngredientClick(ingredient)}
            disabled={isIngredientSelected(ingredient) || state.selectedIngredients.length >= 3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
              isIngredientSelected(ingredient)
                ? 'opacity-50 cursor-not-allowed bg-stone-600'
                : state.selectedIngredients.length >= 3
                ? 'opacity-60 cursor-not-allowed bg-stone-700'
                : `${getRarityColor(ingredient.rarity)} hover:shadow-lg ingredient-hover`
            }`}
          >
            {/* Ingredient Icon */}
            <div className="text-3xl mb-2">{ingredient.icon}</div>
            
            {/* Ingredient Name */}
            <div className="text-sm font-medium text-stone-800 mb-1">
              {ingredient.name}
            </div>
            
            {/* Rarity Badge */}
            <div className={`absolute top-1 right-1 px-2 py-1 rounded-full text-xs font-bold ${
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
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            )}
            
            {/* Magical Shimmer Effect */}
            {!isIngredientSelected(ingredient) && state.selectedIngredients.length < 3 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Selection Counter */}
      <div className="text-center text-stone-400 text-sm">
        {state.selectedIngredients.length}/3 ingredients selected
      </div>
    </div>
  );
}

export default IngredientShelf;