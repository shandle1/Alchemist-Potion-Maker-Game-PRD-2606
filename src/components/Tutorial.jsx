import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiArrowLeft, FiX } = FiIcons;

const tutorialSteps = [
  {
    id: 1,
    title: "Welcome to the Laboratory!",
    content: "Greetings, young alchemist! I am your guide through the mystical arts of potion making. Let me show you around your new laboratory.",
    highlight: null,
    ghostPosition: "center"
  },
  {
    id: 2,
    title: "Reading Customer Letters",
    content: "Each day, you'll receive letters from customers requesting specific potions. Read them carefully to learn what ingredients you need.",
    highlight: "recipe-letter",
    ghostPosition: "left"
  },
  {
    id: 3,
    title: "The Ingredient Shelf",
    content: "Here you'll find all your magical ingredients. Each has different properties and rarities. Click on ingredients to add them to your cauldron.",
    highlight: "ingredient-shelf",
    ghostPosition: "right"
  },
  {
    id: 4,
    title: "The Magical Cauldron",
    content: "This is where the magic happens! Add ingredients here and watch as they bubble and brew. You can add up to 3 ingredients per potion.",
    highlight: "cauldron",
    ghostPosition: "left"
  },
  {
    id: 5,
    title: "Ingredient Order Matters!",
    content: "⚠️ IMPORTANT: You must select ingredients in the exact order listed in the recipe! The first ingredient in the recipe must be selected first, then the second, and so on. Wrong order = failed potion!",
    highlight: "ingredient-shelf",
    ghostPosition: "center"
  },
  {
    id: 6,
    title: "Preparation Methods",
    content: "After selecting ingredients in the correct order, you'll need to prepare each one using specific methods. Each ingredient requires a different preparation technique - chop, crush, burn, purify, and many more!",
    highlight: "craft-button",
    ghostPosition: "center"
  },
  {
    id: 7,
    title: "⚡ NEW: Timing Challenge!",
    content: "🆕 MASTER THE THIRD CHALLENGE! After choosing the correct preparation method, you must click at the perfect moment during the timing bar. Click when the bar is in the GREEN zone for perfect timing. Miss the timing = reduced score!",
    highlight: "craft-button",
    ghostPosition: "center"
  },
  {
    id: 8,
    title: "Triple Challenge Mastery",
    content: "To become a true alchemist master, you must excel at ALL THREE challenges: 1️⃣ Correct ingredient order, 2️⃣ Proper preparation methods, 3️⃣ Perfect timing precision. Each challenge affects your final score!",
    highlight: "craft-button",
    ghostPosition: "center"
  },
  {
    id: 9,
    title: "Leveling Up",
    content: "As you successfully brew potions and master the triple challenges, you'll gain experience and level up. Higher levels unlock new recipes and more powerful ingredients!",
    highlight: "player-stats",
    ghostPosition: "top"
  },
  {
    id: 10,
    title: "Ready to Begin!",
    content: "You're now ready to start your alchemical journey! Remember: correct ingredient ORDER, proper preparation methods, and PERFECT TIMING are all key to becoming a master alchemist. Good luck with the triple challenge!",
    highlight: null,
    ghostPosition: "center"
  }
];

function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const { dispatch } = useGame();

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dispatch({ type: 'COMPLETE_TUTORIAL' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      {/* Tutorial Modal - Fixed height and scrollable */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-stone-800 rounded-2xl border border-stone-700 shadow-2xl relative w-full max-w-lg"
        style={{
          height: 'min(90vh, 600px)', // Fixed height that works on mobile
          maxHeight: '90vh'
        }}
      >
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-300 transition-colors z-10"
        >
          <SafeIcon icon={FiX} className="w-6 h-6" />
        </button>

        {/* Scrollable Content Container */}
        <div className="h-full flex flex-col">
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0 p-6 pb-4">
            {/* Ghost Character */}
            <div className="text-center">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl mb-3 ghost-float"
              >
                👻
              </motion.div>
              <div className="text-amber-400 font-medieval text-lg">
                Tutorial Ghost
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h2 className="text-xl sm:text-2xl font-medieval font-bold text-amber-400 mb-4">
                  {currentStepData.title}
                </h2>
                <p className="text-stone-300 leading-relaxed text-base sm:text-lg">
                  {currentStepData.content}
                </p>

                {/* Special visual emphasis for ingredient order step */}
                {currentStep === 4 && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-lg">
                    <div className="text-red-300 text-sm font-medium mb-2">
                      📋 Example Recipe Order:
                    </div>
                    <div className="space-y-1 text-red-200 text-sm">
                      <div>1️⃣ Red Mushroom (select first)</div>
                      <div>2️⃣ Spring Water (select second)</div>
                      <div>3️⃣ Mint Leaves (select third)</div>
                    </div>
                    <div className="mt-2 text-red-400 text-xs italic">
                      Selecting in wrong order will result in a failed potion!
                    </div>
                  </div>
                )}

                {/* Special visual emphasis for preparation step */}
                {currentStep === 5 && (
                  <div className="mt-4 p-4 bg-purple-900/30 border border-purple-500 rounded-lg">
                    <div className="text-purple-300 text-sm font-medium mb-2">
                      🔧 Preparation Examples:
                    </div>
                    <div className="space-y-1 text-purple-200 text-sm">
                      <div>🍄 Red Mushroom → Chop</div>
                      <div>💧 Spring Water → Purify</div>
                      <div>🌿 Mint Leaves → Crush</div>
                    </div>
                    <div className="mt-2 text-purple-400 text-xs italic">
                      Each ingredient needs its specific preparation method!
                    </div>
                  </div>
                )}

                {/* NEW: Special visual emphasis for timing challenge */}
                {currentStep === 6 && (
                  <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg">
                    <div className="text-yellow-300 text-sm font-medium mb-2">
                      ⚡ Timing Challenge:
                    </div>
                    <div className="space-y-1 text-yellow-200 text-sm">
                      <div>🎯 Click when the bar is in the GREEN zone</div>
                      <div>⏰ Each method has different timing windows</div>
                      <div>🏆 Perfect timing = maximum score</div>
                    </div>
                    <div className="mt-2 text-yellow-400 text-xs italic">
                      This is the hardest challenge - practice makes perfect!
                    </div>
                  </div>
                )}

                {/* Triple challenge summary */}
                {currentStep === 7 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-red-900/30 via-purple-900/30 to-yellow-900/30 border border-stone-500 rounded-lg">
                    <div className="text-stone-200 text-sm font-medium mb-2">
                      🏆 The Triple Challenge:
                    </div>
                    <div className="space-y-2 text-stone-300 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold">1</div>
                        <span>Correct ingredient order (33% of score)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold">2</div>
                        <span>Proper preparation methods (33% of score)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2 text-black text-xs font-bold">3</div>
                        <span>Perfect timing precision (34% of score)</span>
                      </div>
                    </div>
                    <div className="mt-2 text-stone-400 text-xs italic">
                      Master all three for 100% score and maximum rewards!
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="flex-shrink-0 p-6 pt-4 border-t border-stone-700">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400 text-sm">Progress</span>
                <span className="text-stone-400 text-sm">
                  {currentStep + 1} of {tutorialSteps.length}
                </span>
              </div>
              <div className="w-full bg-stone-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-stone-600 cursor-not-allowed'
                    : 'text-stone-300 hover:text-amber-400 hover:bg-stone-700'
                }`}
              >
                <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-amber-600 hover:to-orange-600 flex-1 sm:flex-none justify-center"
              >
                <span>
                  {currentStep === tutorialSteps.length - 1 ? 'Start the Triple Challenge!' : 'Next'}
                </span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Highlight Overlay */}
      {currentStepData.highlight && (
        <div className="absolute inset-0 pointer-events-none">
          {/* This would highlight specific elements based on currentStepData.highlight */}
          <div className="absolute inset-0 bg-amber-400/10 animate-pulse rounded-lg"></div>
        </div>
      )}
    </motion.div>
  );
}

export default Tutorial;