import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDroplet, FiX } = FiIcons;

function Cauldron({ selectedIngredients, onCraft, onRemoveIngredient, isAnimating, canCraft }) {
  const handleRemoveIngredient = (index) => {
    if (onRemoveIngredient) {
      onRemoveIngredient(index);
    }
  };

  return (
    <div className="relative">
      {/* Potion Bottle Only - No Large Circle */}
      <div className="mt-8 flex justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-40 relative"
          >
            {/* Bottle Body */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-stone-300/80 to-stone-400/90 rounded-b-3xl rounded-t-2xl border-3 border-stone-500 shadow-2xl">
              {/* Bottle Highlight */}
              <div className="absolute top-3 left-3 w-3 h-12 bg-white/40 rounded-full blur-sm"></div>

              {/* Potion Liquid */}
              <motion.div
                animate={{
                  backgroundColor: selectedIngredients.length > 0
                    ? ['#78716c', '#f59e0b', '#ef4444', '#3b82f6'][selectedIngredients.length % 4]
                    : '#78716c',
                  height: selectedIngredients.length > 0 ? '75%' : '20%'
                }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-2 left-2 right-2 rounded-b-2xl opacity-90"
                style={{ minHeight: '8px' }}
              >
                {/* Liquid Surface Shine */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-full"></div>

                {/* Bubbles in liquid */}
                {selectedIngredients.length > 0 && (
                  <div className="absolute inset-0">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          left: `${20 + i * 20}%`,
                          bottom: `${10 + (i % 2) * 30}%`,
                        }}
                        animate={{
                          y: [0, -15, -30, 0],
                          opacity: [0.3, 0.8, 0.3, 0.3],
                          scale: [0.5, 1, 0.5, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.7,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Bottle Neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-stone-300/80 to-stone-400/90 rounded-t-2xl border-3 border-stone-500 border-b-0">
              {/* Neck Highlight */}
              <div className="absolute top-2 left-2 w-1.5 h-10 bg-white/40 rounded-full blur-sm"></div>
            </div>

            {/* Ornate Cork/Stopper */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-full border-3 border-amber-600 shadow-lg">
              {/* Cork decorative pattern */}
              <div className="absolute top-1 left-1 right-1 space-y-1">
                <div className="h-1 bg-amber-600 rounded-full"></div>
                <div className="h-0.5 bg-amber-600 rounded-full mx-1"></div>
                <div className="h-1 bg-amber-600 rounded-full"></div>
              </div>
              {/* Cork top gem */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full border border-amber-300 shadow-md"></div>
            </div>

            {/* Ornate Label */}
            {selectedIngredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-amber-50 rounded-lg px-3 py-2 border-2 border-amber-200 shadow-lg"
              >
                <div className="text-sm text-amber-800 font-medieval text-center font-bold">
                  Brewing...
                </div>
                <div className="text-xs text-amber-600 text-center mt-1">
                  {selectedIngredients.length}/3 ingredients
                </div>
              </motion.div>
            )}

            {/* Magical Aura based on ingredient count */}
            <motion.div
              animate={{
                opacity: selectedIngredients.length >= 2 ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
                scale: selectedIngredients.length >= 2 ? [1, 1.15, 1] : [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className={`absolute inset-0 rounded-3xl blur-xl ${
                selectedIngredients.length === 3
                  ? 'bg-green-400/30'
                  : selectedIngredients.length >= 2
                  ? 'bg-blue-400/25'
                  : selectedIngredients.length >= 1
                  ? 'bg-amber-400/20'
                  : 'bg-stone-400/15'
              }`}
            ></motion.div>

            {/* Enhanced Sparkle Effects */}
            {selectedIngredients.length > 0 && (
              <div className="absolute inset-0">
                {[...Array(selectedIngredients.length === 3 ? 12 : 6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      selectedIngredients.length === 3 ? 'bg-green-300' : 'bg-amber-300'
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Brewing Animation Effects */}
            {(canCraft || isAnimating) && selectedIngredients.length > 0 && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-400/60 rounded-full"
                    style={{
                      left: `${30 + (i % 3) * 15}%`,
                      bottom: '25%',
                    }}
                    animate={{
                      y: [0, -20, -40],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Selected Ingredients Display */}
      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-medieval font-semibold text-amber-400 text-center">
          Selected Ingredients
        </h3>
        <div className="min-h-[100px] bg-stone-700/50 rounded-lg p-4 border border-stone-600">
          {selectedIngredients.length === 0 ? (
            <div className="text-center text-stone-400 py-8">
              <SafeIcon icon={FiDroplet} className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Drop ingredients here to brew</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedIngredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between bg-stone-600/50 rounded-lg p-2 group hover:bg-stone-600/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{ingredient.icon}</span>
                    <span className="text-stone-200">{ingredient.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ingredient.rarity === 'common'
                        ? 'bg-gray-500 text-white'
                        : ingredient.rarity === 'rare'
                        ? 'bg-blue-500 text-white'
                        : ingredient.rarity === 'epic'
                        ? 'bg-purple-500 text-white'
                        : 'bg-yellow-500 text-black'
                    }`}>
                      {ingredient.rarity}
                    </div>
                    {/* Remove Button */}
                    <motion.button
                      onClick={() => handleRemoveIngredient(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title={`Remove ${ingredient.name}`}
                    >
                      <SafeIcon icon={FiX} className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Clear All Button */}
        {selectedIngredients.length > 0 && (
          <div className="flex justify-center mt-4">
            <motion.button
              onClick={() => {
                // Remove all ingredients by calling remove for each one in reverse order
                for (let i = selectedIngredients.length - 1; i >= 0; i--) {
                  setTimeout(() => handleRemoveIngredient(i), (selectedIngredients.length - 1 - i) * 100);
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cauldron;