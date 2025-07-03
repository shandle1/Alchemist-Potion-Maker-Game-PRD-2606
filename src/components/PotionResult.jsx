import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiStar, FiArrowRight } = FiIcons;

function PotionResult({ recipe, selectedIngredients, onNext }) {
  const { state } = useGame();
  
  const isCorrect = recipe.ingredients.every(ingredient =>
    selectedIngredients.some(selected => selected.name === ingredient)
  ) && selectedIngredients.length === recipe.ingredients.length;

  const correctIngredients = selectedIngredients.filter(selected =>
    recipe.ingredients.includes(selected.name)
  );

  const incorrectIngredients = selectedIngredients.filter(selected =>
    !recipe.ingredients.includes(selected.name)
  );

  const pointsEarned = isCorrect ? recipe.points : Math.floor(recipe.points * 0.3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-stone-800 rounded-2xl p-8 max-w-md w-full border border-stone-700 shadow-2xl"
      >
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-emerald-500' : 'bg-amber-500'
          }`}>
            <SafeIcon 
              icon={isCorrect ? FiCheck : FiStar} 
              className="w-8 h-8 text-white" 
            />
          </div>
          
          <h2 className="text-2xl font-medieval font-bold text-amber-400 mb-2">
            {isCorrect ? 'Perfect Brew!' : 'Potion Complete!'}
          </h2>
          
          <p className="text-stone-300">
            {isCorrect 
              ? 'You crafted the perfect potion!' 
              : 'Your potion has some interesting properties...'}
          </p>
        </div>

        {/* Potion Visualization */}
        <div className="relative mb-6">
          <div className="w-32 h-40 mx-auto relative">
            {/* Potion Bottle */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-600 to-stone-700 rounded-b-full rounded-t-lg"></div>
            
            {/* Potion Liquid */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '70%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-0 left-2 right-2 rounded-b-full"
              style={{ backgroundColor: isCorrect ? recipe.color : '#78716c' }}
            />
            
            {/* Bottle Neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-stone-600 rounded-t-lg"></div>
            
            {/* Cork */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-amber-800 rounded-full"></div>
            
            {/* Magical Effects */}
            {isCorrect && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-300 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
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
          </div>
        </div>

        {/* Ingredients Analysis */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medieval font-semibold text-amber-400">
            Ingredient Analysis
          </h3>
          
          {/* Correct Ingredients */}
          {correctIngredients.length > 0 && (
            <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-700">
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-emerald-400 font-medium">Correct Ingredients</span>
              </div>
              <div className="space-y-1">
                {correctIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center text-emerald-300 text-sm">
                    <span className="mr-2">{ingredient.icon}</span>
                    <span>{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Incorrect Ingredients */}
          {incorrectIngredients.length > 0 && (
            <div className="bg-red-900/30 rounded-lg p-3 border border-red-700">
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiX} className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-red-400 font-medium">Incorrect Ingredients</span>
              </div>
              <div className="space-y-1">
                {incorrectIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center text-red-300 text-sm">
                    <span className="mr-2">{ingredient.icon}</span>
                    <span>{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Points Earned */}
        <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-medium">Points Earned:</span>
            <span className="text-amber-300 font-bold text-xl">{pointsEarned}</span>
          </div>
          {!isCorrect && (
            <p className="text-amber-300 text-sm mt-2">
              Bonus points for perfect recipes!
            </p>
          )}
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>Next Recipe</span>
          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PotionResult;