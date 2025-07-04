import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiScissors, 
  FiZap, 
  FiDroplet, 
  FiRotateCw, 
  FiHammer, 
  FiFlame, 
  FiWind, 
  FiSun, 
  FiMoon, 
  FiShield, 
  FiBook, 
  FiX, 
  FiEye, 
  FiAlertTriangle, 
  FiClock, 
  FiPlay, 
  FiPause, 
  FiCheck, 
  FiSkipForward 
} = FiIcons;

// Preparation methods with ingredient type compatibility
const preparationMethods = {
  // Solid ingredient methods
  chop: { icon: FiScissors, color: 'text-orange-500', description: 'Chop finely with precision', compatibleTypes: ['solid'], timingWindow: 3000 },
  crush: { icon: FiHammer, color: 'text-red-500', description: 'Crush into powder', compatibleTypes: ['solid'], timingWindow: 2500 },
  grind: { icon: FiHammer, color: 'text-stone-500', description: 'Grind into fine particles', compatibleTypes: ['solid'], timingWindow: 4000 },
  carve: { icon: FiScissors, color: 'text-stone-600', description: 'Carve intricate symbols', compatibleTypes: ['solid'], timingWindow: 5000 },
  pound: { icon: FiHammer, color: 'text-stone-700', description: 'Pound with rhythmic strikes', compatibleTypes: ['solid'], timingWindow: 3500 },
  forge: { icon: FiHammer, color: 'text-red-800', description: 'Forge with elemental heat', compatibleTypes: ['solid'], timingWindow: 6000 },
  shatter: { icon: FiHammer, color: 'text-red-700', description: 'Shatter with controlled force', compatibleTypes: ['solid'], timingWindow: 2000 },
  polish: { icon: FiRotateCw, color: 'text-gray-400', description: 'Polish to perfection', compatibleTypes: ['solid'], timingWindow: 4500 },
  pluck: { icon: FiScissors, color: 'text-amber-600', description: 'Pluck at the perfect moment', compatibleTypes: ['solid'], timingWindow: 1500 },
  scale: { icon: FiScissors, color: 'text-blue-600', description: 'Scale with precision', compatibleTypes: ['solid'], timingWindow: 3000 },

  // Liquid ingredient methods
  boil: { icon: FiDroplet, color: 'text-blue-500', description: 'Boil until essence emerges', compatibleTypes: ['liquid'], timingWindow: 5000 },
  purify: { icon: FiShield, color: 'text-cyan-500', description: 'Purify with sacred rituals', compatibleTypes: ['liquid'], timingWindow: 4000 },
  dissolve: { icon: FiDroplet, color: 'text-blue-400', description: 'Dissolve completely', compatibleTypes: ['liquid', 'powder'], timingWindow: 3500 },
  heat: { icon: FiFlame, color: 'text-red-600', description: 'Heat to perfect temperature', compatibleTypes: ['liquid'], timingWindow: 4500 },
  steep: { icon: FiDroplet, color: 'text-green-400', description: 'Steep in magical waters', compatibleTypes: ['liquid'], timingWindow: 6000 },
  extract: { icon: FiDroplet, color: 'text-green-600', description: 'Extract vital compounds', compatibleTypes: ['liquid', 'solid'], timingWindow: 3000 },

  // Gas/essence methods
  capture: { icon: FiWind, color: 'text-cyan-400', description: 'Capture fleeting essence', compatibleTypes: ['gas'], timingWindow: 2000 },
  concentrate: { icon: FiDroplet, color: 'text-indigo-600', description: 'Concentrate the essence', compatibleTypes: ['gas', 'liquid'], timingWindow: 4000 },
  condense: { icon: FiWind, color: 'text-gray-500', description: 'Condense vaporous essence', compatibleTypes: ['gas'], timingWindow: 3500 },

  // Universal methods
  burn: { icon: FiFlame, color: 'text-red-600', description: 'Burn to release magical properties', compatibleTypes: ['solid', 'liquid', 'gas', 'powder'], timingWindow: 3000 },
  mix: { icon: FiRotateCw, color: 'text-purple-500', description: 'Mix with careful circular motions', compatibleTypes: ['solid', 'liquid', 'powder'], timingWindow: 4000 },
  enchant: { icon: FiZap, color: 'text-yellow-500', description: 'Enchant with magical energy', compatibleTypes: ['solid', 'liquid', 'gas'], timingWindow: 5000 },
  infuse: { icon: FiSun, color: 'text-amber-500', description: 'Infuse with moonlight', compatibleTypes: ['solid', 'liquid', 'gas'], timingWindow: 4500 },
  channel: { icon: FiZap, color: 'text-purple-600', description: 'Channel arcane energies', compatibleTypes: ['solid', 'liquid', 'gas'], timingWindow: 3500 },
  weave: { icon: FiRotateCw, color: 'text-indigo-500', description: 'Weave magical patterns', compatibleTypes: ['solid', 'gas'], timingWindow: 5500 },
  activate: { icon: FiZap, color: 'text-yellow-600', description: 'Activate dormant powers', compatibleTypes: ['solid', 'liquid', 'gas'], timingWindow: 2500 },
  sanctify: { icon: FiShield, color: 'text-white', description: 'Sanctify with holy energy', compatibleTypes: ['solid', 'liquid', 'gas'], timingWindow: 6000 }
};

function IngredientPreparation() {
  const { state, dispatch } = useGame();
  const [selectedMethod, setSelectedMethod] = useState({});
  const [completedPreparations, setCompletedPreparations] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [timingChallenges, setTimingChallenges] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  
  // Overall preparation timer (60 seconds)
  const [preparationTimeLeft, setPreparationTimeLeft] = useState(60);
  const [preparationTimerActive, setPreparationTimerActive] = useState(true);
  const [missedIngredients, setMissedIngredients] = useState([]);

  // Start the overall preparation timer
  useEffect(() => {
    if (!preparationTimerActive) return;

    const timer = setInterval(() => {
      setPreparationTimeLeft(prev => {
        if (prev <= 1) {
          setPreparationTimerActive(false);
          // Auto-fail any remaining ingredients
          const remainingIngredients = state.selectedIngredients
            .map((_, index) => index)
            .filter(index => !completedPreparations.includes(index));
          
          if (remainingIngredients.length > 0) {
            setMissedIngredients(remainingIngredients);
            // Auto-prepare missed ingredients with failed status
            remainingIngredients.forEach(ingredientIndex => {
              dispatch({
                type: 'PREPARE_INGREDIENT',
                payload: {
                  ingredientIndex,
                  method: 'timeout',
                  isCorrect: false,
                  methodCorrect: false,
                  timingCorrect: false,
                  timingResult: 0,
                  missedDueToTimeout: true
                }
              });
            });
            setCompletedPreparations(prev => [...prev, ...remainingIngredients]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [preparationTimerActive, completedPreparations, state.selectedIngredients, dispatch]);

  // Stop the timer when all preparations are complete
  useEffect(() => {
    if (completedPreparations.length === state.selectedIngredients.length) {
      setPreparationTimerActive(false);
    }
  }, [completedPreparations.length, state.selectedIngredients.length]);

  const getIngredientType = (ingredientName) => {
    const ingredient = state.availableIngredients.find(ing => ing.name === ingredientName);
    return ingredient ? ingredient.type : 'solid';
  };

  const getCompatibleMethods = (ingredientType) => {
    return Object.entries(preparationMethods).filter(([, method]) => 
      method.compatibleTypes.includes(ingredientType)
    );
  };

  const handleMethodSelect = (ingredientIndex, method) => {
    if (!preparationTimerActive) return;
    
    const ingredient = state.selectedIngredients[ingredientIndex];
    const ingredientType = getIngredientType(ingredient.name);
    const methodConfig = preparationMethods[method];
    
    if (methodConfig && methodConfig.compatibleTypes.includes(ingredientType)) {
      setSelectedMethod(prev => ({
        ...prev,
        [ingredientIndex]: method
      }));
    }
  };

  const startTimingChallenge = (ingredientIndex) => {
    if (!preparationTimerActive) return;
    
    const method = selectedMethod[ingredientIndex];
    if (!method) return;

    const methodConfig = preparationMethods[method];
    const timingWindow = methodConfig.timingWindow;
    const startTime = Date.now();
    
    setTimingChallenges(prev => ({
      ...prev,
      [ingredientIndex]: {
        isActive: true,
        startTime: startTime,
        duration: timingWindow,
        targetStart: timingWindow * 0.3,
        targetEnd: timingWindow * 0.7,
        completed: false
      }
    }));

    setActiveTimers(prev => ({
      ...prev,
      [ingredientIndex]: {
        progress: 0,
        isRunning: true
      }
    }));

    const animateTimer = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min((elapsed / timingWindow) * 100, 100);
      
      setActiveTimers(prev => ({
        ...prev,
        [ingredientIndex]: {
          ...prev[ingredientIndex],
          progress: progress
        }
      }));

      if (progress < 100) {
        requestAnimationFrame(animateTimer);
      } else {
        setTimingChallenges(prev => ({
          ...prev,
          [ingredientIndex]: {
            ...prev[ingredientIndex],
            isActive: false,
            completed: true,
            success: false,
            finalProgress: 100
          }
        }));
        
        setActiveTimers(prev => ({
          ...prev,
          [ingredientIndex]: {
            ...prev[ingredientIndex],
            isRunning: false
          }
        }));
      }
    };

    requestAnimationFrame(animateTimer);
  };

  const handleTimingClick = (ingredientIndex) => {
    if (!preparationTimerActive) return;
    
    const challenge = timingChallenges[ingredientIndex];
    if (!challenge || !challenge.isActive) return;

    const elapsed = Date.now() - challenge.startTime;
    const progress = (elapsed / challenge.duration) * 100;
    
    const isInSweetSpot = progress >= 30 && progress <= 70;
    
    setTimingChallenges(prev => ({
      ...prev,
      [ingredientIndex]: {
        ...prev[ingredientIndex],
        isActive: false,
        completed: true,
        success: isInSweetSpot,
        finalProgress: progress
      }
    }));

    setActiveTimers(prev => ({
      ...prev,
      [ingredientIndex]: {
        ...prev[ingredientIndex],
        isRunning: false
      }
    }));
  };

  const handlePrepare = (ingredientIndex) => {
    if (!preparationTimerActive) return;
    
    const method = selectedMethod[ingredientIndex];
    if (!method) return;

    const requiredMethod = state.currentRecipe.preparations[ingredientIndex];
    const isCorrectMethod = method === requiredMethod;
    
    const timingResult = timingChallenges[ingredientIndex];
    const hasTimingSuccess = timingResult && timingResult.success;
    
    const isCorrect = isCorrectMethod && hasTimingSuccess;

    dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: {
        ingredientIndex,
        method,
        isCorrect,
        methodCorrect: isCorrectMethod,
        timingCorrect: hasTimingSuccess,
        timingResult: timingResult?.finalProgress || 0,
        missedDueToTimeout: false
      }
    });

    setCompletedPreparations(prev => [...prev, ingredientIndex]);
  };

  const handleContinue = () => {
    dispatch({ type: 'CRAFT_POTION' });
  };

  const allPreparationsComplete = completedPreparations.length === state.selectedIngredients.length;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (preparationTimeLeft > 30) return 'text-green-400';
    if (preparationTimeLeft > 15) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-stone-800 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-stone-700 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch({ type: 'SELECT_RECIPE', payload: state.currentRecipe })}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-300 transition-colors z-10"
          title="Back to Laboratory"
        >
          <SafeIcon icon={FiX} className="w-6 h-6" />
        </button>

        {/* Header with Timer */}
        <div className="text-center mb-6 pr-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-medieval font-bold text-amber-400">
              Ingredient Preparation
            </h2>
            {/* Overall Preparation Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${
              preparationTimerActive 
                ? preparationTimeLeft > 15 
                  ? 'border-green-500 bg-green-900/20' 
                  : 'border-red-500 bg-red-900/20 animate-pulse'
                : 'border-stone-500 bg-stone-900/20'
            }`}>
              <SafeIcon icon={FiClock} className={`w-5 h-5 ${getTimerColor()}`} />
              <span className={`font-bold text-lg ${getTimerColor()}`}>
                {formatTime(preparationTimeLeft)}
              </span>
              {!preparationTimerActive && (
                <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-400" />
              )}
            </div>
          </div>

          <p className="text-stone-300 mb-2">
            Each ingredient must be prepared with the correct method AND perfect timing!
          </p>
          
          {/* Timer Warning */}
          <div className={`border rounded-lg p-3 mt-4 ${
            preparationTimerActive 
              ? 'bg-red-900/30 border-red-500' 
              : 'bg-stone-900/30 border-stone-500'
          }`}>
            <div className="flex items-center justify-center text-sm font-medium">
              <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
              {preparationTimerActive ? (
                <span className="text-red-300">
                  ⏰ HURRY! Complete all preparations before time runs out!
                </span>
              ) : (
                <span className="text-stone-400">
                  ⏰ TIME'S UP! Incomplete preparations will be marked as failed.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Reference Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowRecipe(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center space-x-2"
            title="View Recipe"
          >
            <SafeIcon icon={FiBook} className="w-5 h-5" />
            <span>View Recipe</span>
          </button>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {state.selectedIngredients.map((ingredient, index) => {
            const isCompleted = completedPreparations.includes(index);
            const isMissed = missedIngredients.includes(index);
            const requiredMethod = state.currentRecipe.preparations[index];
            const selectedMethodForIngredient = selectedMethod[index];
            const ingredientType = getIngredientType(ingredient.name);
            const compatibleMethods = getCompatibleMethods(ingredientType);
            const timingChallenge = timingChallenges[index];
            const timer = activeTimers[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-stone-700 rounded-xl p-4 border-2 transition-all duration-300 ${
                  isCompleted 
                    ? isMissed 
                      ? 'border-red-500 bg-red-900/20' 
                      : 'border-green-500 bg-green-900/20'
                    : !preparationTimerActive
                    ? 'border-stone-500 bg-stone-900/20 opacity-60'
                    : 'border-stone-600 hover:border-amber-500'
                }`}
              >
                {/* Ingredient Info */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{ingredient.icon}</div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-1">
                    {ingredient.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ingredient.rarity === 'legendary' ? 'bg-yellow-500 text-black' :
                      ingredient.rarity === 'epic' ? 'bg-purple-500 text-white' :
                      ingredient.rarity === 'rare' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {ingredient.rarity}
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-stone-500 text-white capitalize">
                      {ingredientType}
                    </div>
                  </div>
                </div>

                {!isCompleted ? (
                  <>
                    {/* Required Method Hint */}
                    <div className="mb-3 p-2 bg-amber-900/30 rounded-lg border border-amber-700">
                      <div className="flex items-center text-amber-300 text-sm">
                        <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
                        <span>Required: <strong className="capitalize">{requiredMethod}</strong></span>
                      </div>
                    </div>

                    {/* Method Selection */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-stone-300 mb-2">
                        Choose preparation method:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {compatibleMethods.map(([method, config]) => (
                          <button
                            key={method}
                            onClick={() => handleMethodSelect(index, method)}
                            disabled={!preparationTimerActive}
                            className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                              !preparationTimerActive 
                                ? 'border-stone-600 bg-stone-900/50 opacity-50 cursor-not-allowed'
                                : selectedMethodForIngredient === method
                                ? 'border-amber-500 bg-amber-500/20'
                                : method === requiredMethod
                                ? 'border-green-500 hover:border-green-400'
                                : 'border-stone-600 hover:border-stone-500'
                            }`}
                          >
                            <SafeIcon icon={config.icon} className={`w-4 h-4 ${config.color} mx-auto mb-1`} />
                            <div className="text-xs text-stone-300 capitalize">
                              {method}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timing Challenge */}
                    {selectedMethodForIngredient && (
                      <div className="mb-4">
                        {!timingChallenge || !timingChallenge.completed ? (
                          <div className="space-y-3">
                            <div className="text-center">
                              <button
                                onClick={() => startTimingChallenge(index)}
                                disabled={!preparationTimerActive || (timingChallenge && timingChallenge.isActive)}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                                  !preparationTimerActive
                                    ? 'bg-stone-600 text-stone-400 cursor-not-allowed'
                                    : timingChallenge && timingChallenge.isActive
                                    ? 'bg-red-600 text-white cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                                }`}
                              >
                                <SafeIcon icon={FiPlay} className="w-4 h-4 inline mr-2" />
                                {!preparationTimerActive ? 'Time Expired' :
                                 timingChallenge && timingChallenge.isActive ? 'Timing Active!' : 'Start Timing Challenge'}
                              </button>
                            </div>

                            {/* Timer Bar */}
                            {timer && timer.isRunning && (
                              <div className="relative">
                                <div className="w-full h-8 bg-stone-600 rounded-lg overflow-hidden border-2 border-stone-500 relative">
                                  {/* Background sections */}
                                  <div className="absolute inset-0 flex">
                                    <div className="w-[30%] bg-red-500/30"></div>
                                    <div className="w-[40%] bg-green-500/30"></div>
                                    <div className="w-[30%] bg-red-500/30"></div>
                                  </div>
                                  
                                  {/* Progress bar */}
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-75 ease-linear relative"
                                    style={{ width: `${timer.progress}%` }}
                                  >
                                    <div className="absolute right-0 top-0 w-1 h-full bg-white shadow-lg"></div>
                                  </div>
                                  
                                  {/* Zone indicators */}
                                  <div className="absolute top-0 left-[30%] w-[40%] h-full border-x-2 border-green-400 pointer-events-none">
                                    <div className="text-xs text-green-400 font-bold text-center leading-8">SWEET SPOT</div>
                                  </div>
                                </div>
                                
                                {/* Click target */}
                                <button
                                  onClick={() => handleTimingClick(index)}
                                  className="absolute inset-0 w-full h-full bg-transparent hover:bg-white/10 rounded-lg transition-colors"
                                  title="Click when in the green zone!"
                                >
                                  <div className="flex items-center justify-center h-full">
                                    <span className="text-white font-bold text-sm drop-shadow-lg">CLICK!</span>
                                  </div>
                                </button>

                                {/* Progress indicator */}
                                <div className="text-center mt-2">
                                  <div className="text-xs text-stone-400">
                                    Progress: {Math.round(timer.progress)}%
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                              timingChallenge.success ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              <SafeIcon icon={timingChallenge.success ? FiCheck : FiX} className="w-6 h-6 text-white" />
                            </div>
                            <div className={`font-medium ${timingChallenge.success ? 'text-green-400' : 'text-red-400'}`}>
                              {timingChallenge.success ? 'Perfect Timing!' : 'Timing Failed!'}
                            </div>
                            <div className="text-xs text-stone-400 mt-1">
                              Clicked at {Math.round(timingChallenge.finalProgress)}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Prepare Button */}
                    <button
                      onClick={() => handlePrepare(index)}
                      disabled={!preparationTimerActive || !selectedMethodForIngredient || !timingChallenge || !timingChallenge.completed}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        !preparationTimerActive
                          ? 'bg-stone-600 text-stone-400 cursor-not-allowed'
                          : selectedMethodForIngredient && timingChallenge && timingChallenge.completed
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                          : 'bg-stone-600 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      {!preparationTimerActive ? 'Time Expired' : 'Prepare Ingredient'}
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      isMissed ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      <SafeIcon icon={isMissed ? FiSkipForward : FiCheck} className="w-6 h-6 text-white" />
                    </div>
                    <div className={`font-medium ${isMissed ? 'text-red-400' : 'text-green-400'}`}>
                      {isMissed ? 'Missed - Time Expired!' : 'Preparation Complete!'}
                    </div>
                    <div className="text-xs text-stone-400 mt-1">
                      Method: {selectedMethod[index] || 'None'}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <motion.button
            onClick={handleContinue}
            disabled={!allPreparationsComplete}
            whileHover={{ scale: allPreparationsComplete ? 1.02 : 1 }}
            whileTap={{ scale: allPreparationsComplete ? 0.98 : 1 }}
            className={`py-3 px-8 rounded-xl font-medieval font-bold text-lg transition-all duration-300 ${
              allPreparationsComplete
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-stone-600 text-stone-400 cursor-not-allowed'
            }`}
          >
            {allPreparationsComplete 
              ? 'Brew Potion!' 
              : `Complete All Preparations (${completedPreparations.length}/${state.selectedIngredients.length})`
            }
          </motion.button>
        </div>

        {/* Enhanced Hint */}
        <div className="mt-6 text-center text-stone-400 text-sm">
          <p>💡 Master all THREE challenges: Correct ingredients, right methods, AND perfect timing!</p>
          {missedIngredients.length > 0 && (
            <p className="text-red-400 mt-2">
              ⚠️ {missedIngredients.length} ingredient(s) missed due to time limit - this will affect your score!
            </p>
          )}
        </div>
      </motion.div>

      {/* Recipe Reference Modal */}
      <AnimatePresence>
        {showRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowRecipe(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-amber-50 rounded-2xl p-6 max-w-md w-full border-2 border-amber-200 shadow-2xl max-h-[80vh] overflow-y-auto"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRecipe(false)}
                className="absolute top-4 right-4 text-stone-600 hover:text-stone-800 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>

              {/* Recipe Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-medieval font-bold text-stone-800 mb-2">
                  {state.currentRecipe.name}
                </h3>
                <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
              </div>

              {/* Required Ingredients */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                  <SafeIcon icon={FiDroplet} className="w-5 h-5 mr-2" />
                  Required Ingredients:
                </h4>
                <div className="space-y-2">
                  {state.currentRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center bg-amber-100 rounded-lg p-3 border border-amber-200">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                      <span className="text-amber-900 font-medium">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Methods */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                  <SafeIcon icon={FiHammer} className="w-5 h-5 mr-2" />
                  Preparation Methods:
                </h4>
                <div className="space-y-2">
                  {state.currentRecipe.preparations.map((preparation, index) => (
                    <div key={index} className="flex items-center justify-between bg-purple-100 rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-purple-900 font-medium capitalize">{preparation}</span>
                      </div>
                      <div className="flex items-center text-purple-700">
                        <SafeIcon icon={preparationMethods[preparation]?.icon || FiHammer} className="w-4 h-4 mr-1" />
                        <span className="text-xs">Step {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing Challenge Info */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                  <SafeIcon icon={FiClock} className="w-5 h-5 mr-2" />
                  Time Pressure:
                </h4>
                <div className="bg-red-100 rounded-lg p-4 border border-red-200">
                  <div className="text-red-800 text-sm space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span>60 seconds to complete ALL preparations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span>Click during the GREEN zone for perfect timing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span>Missed preparations = failed ingredients</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-stone-100 rounded-lg p-4 border-l-4 border-stone-400">
                <p className="text-stone-700 text-sm italic">
                  "Master the quadruple challenge: Select ingredients in perfect order, use correct preparation methods, achieve perfect timing, and do it all within 60 seconds. Only then will you create the legendary {state.currentRecipe.name}."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default IngredientPreparation;