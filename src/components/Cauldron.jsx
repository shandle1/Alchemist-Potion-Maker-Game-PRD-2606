import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDroplet, FiX } = FiIcons;

function Cauldron({ selectedIngredients, onCraft, isAnimating, canCraft }) {
  const handleRemoveIngredient = (index) => {
    // This would be handled by the parent component
    // For now, we'll just show the ingredients
  };

  return (
    <div className="relative">
      {/* Cauldron Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-b from-stone-600 to-stone-800 rounded-full w-64 h-64 mx-auto shadow-2xl border-4 border-stone-700 overflow-hidden"
      >
        {/* Cauldron Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-orange-600/30 rounded-full"></div>
        
        {/* Cauldron Rim */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-stone-500 to-stone-600 rounded-full border-b-2 border-stone-700"></div>
        
        {/* Cauldron Handles */}
        <div className="absolute top-8 -left-6 w-12 h-8 border-4 border-stone-600 rounded-full bg-transparent"></div>
        <div className="absolute top-8 -right-6 w-12 h-8 border-4 border-stone-600 rounded-full bg-transparent"></div>
        
        {/* Potion Liquid */}
        <motion.div
          animate={{
            backgroundColor: selectedIngredients.length > 0 
              ? ['#78716c', '#f59e0b', '#ef4444', '#3b82f6'][selectedIngredients.length % 4]
              : '#78716c'
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-32 rounded-b-full opacity-60"
        />
        
        {/* Bubbling Animation */}
        {(canCraft || isAnimating) && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-amber-400/60 rounded-full"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  bottom: '20%',
                }}
                animate={{
                  y: [0, -40, -80],
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
        
        {/* Magical Sparkles */}
        {isAnimating && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Selected Ingredients Display */}
      <div className="mt-6 space-y-2">
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
                  className="flex items-center justify-between bg-stone-600/50 rounded-lg p-2"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{ingredient.icon}</span>
                    <span className="text-stone-200">{ingredient.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ingredient.rarity === 'common' ? 'bg-gray-500 text-white' :
                    ingredient.rarity === 'rare' ? 'bg-blue-500 text-white' :
                    ingredient.rarity === 'epic' ? 'bg-purple-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {ingredient.rarity}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cauldron;