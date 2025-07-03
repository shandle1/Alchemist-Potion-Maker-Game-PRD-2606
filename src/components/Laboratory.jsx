import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import Cauldron from './Cauldron';
import IngredientShelf from './IngredientShelf';
import PotionResult from './PotionResult';

function Laboratory() {
  const { state, dispatch } = useGame();
  const [showResult, setShowResult] = useState(false);
  const [craftingAnimation, setCraftingAnimation] = useState(false);

  useEffect(() => {
    if (state.gamePhase === 'completed') {
      setShowResult(true);
    }
  }, [state.gamePhase]);

  const handleCraftPotion = () => {
    if (state.selectedIngredients.length === 0) return;
    
    setCraftingAnimation(true);
    
    setTimeout(() => {
      dispatch({ type: 'CRAFT_POTION' });
      setCraftingAnimation(false);
    }, 2000);
  };

  const handleNextRecipe = () => {
    setShowResult(false);
    dispatch({ type: 'NEXT_RECIPE' });
  };

  return (
    <div className="relative">
      {/* Laboratory Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-stone-800/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-700 shadow-2xl min-h-[600px] relative overflow-hidden"
      >
        {/* Ambient Lighting Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Laboratory Title */}
        <div className="relative z-10 mb-6">
          <h2 className="text-3xl font-medieval font-bold text-amber-400 mb-2">
            Alchemist's Workshop
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>

        {/* Main Laboratory Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Cauldron */}
          <div className="space-y-6">
            <Cauldron 
              selectedIngredients={state.selectedIngredients}
              onCraft={handleCraftPotion}
              isAnimating={craftingAnimation}
              canCraft={state.selectedIngredients.length > 0}
            />
            
            {/* Craft Button */}
            <motion.button
              onClick={handleCraftPotion}
              disabled={state.selectedIngredients.length === 0 || craftingAnimation}
              whileHover={{ scale: state.selectedIngredients.length > 0 ? 1.02 : 1 }}
              whileTap={{ scale: state.selectedIngredients.length > 0 ? 0.98 : 1 }}
              className={`w-full py-4 px-6 rounded-xl font-medieval font-bold text-lg transition-all duration-300 ${
                state.selectedIngredients.length > 0 && !craftingAnimation
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl cauldron-glow'
                  : 'bg-stone-700 text-stone-500 cursor-not-allowed'
              }`}
            >
              {craftingAnimation ? 'Brewing...' : 'Craft Potion'}
            </motion.button>
          </div>

          {/* Right Side - Ingredient Shelf */}
          <div>
            <IngredientShelf />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Potion Result Modal */}
      {showResult && (
        <PotionResult
          recipe={state.currentRecipe}
          selectedIngredients={state.selectedIngredients}
          onNext={handleNextRecipe}
        />
      )}
    </div>
  );
}

export default Laboratory;