import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiStar, FiArrowRight, FiAward, FiZap, FiTool, FiTarget, FiClock } = FiIcons;

function PotionResult({ recipe, selectedIngredients, onNext }) {
  const { state } = useGame();

  // Use the craft result from GameContext instead of calculating here
  const craftResult = state.lastCraftResult;

  if (!craftResult) {
    console.error('No craft result found in state!');
    return null;
  }

  const {
    percentageScore,
    ingredientScore,
    preparationScore,
    timingScore,
    ingredientsMatch,
    preparationsMatch,
    timingAccuracy,
    points,
    bonusPoints,
    totalPoints
  } = craftResult;

  console.log('🎯 PotionResult - Using craft result:', craftResult);

  // Get score category and color
  const getScoreCategory = (score) => {
    if (score === 100) return { category: 'Perfect!', color: 'text-yellow-400', bgColor: 'bg-yellow-500' };
    if (score >= 90) return { category: 'Excellent!', color: 'text-green-400', bgColor: 'bg-green-500' };
    if (score >= 80) return { category: 'Great!', color: 'text-blue-400', bgColor: 'bg-blue-500' };
    if (score >= 70) return { category: 'Good!', color: 'text-purple-400', bgColor: 'bg-purple-500' };
    if (score >= 60) return { category: 'Fair', color: 'text-orange-400', bgColor: 'bg-orange-500' };
    if (score >= 50) return { category: 'Needs Work', color: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    return { category: 'Failed', color: 'text-red-400', bgColor: 'bg-red-500' };
  };

  const scoreInfo = getScoreCategory(percentageScore);

  const getResultTitle = () => {
    if (percentageScore === 100) {
      if (recipe.level >= 6) return 'Legendary Mastery!';
      if (recipe.level >= 4) return 'Perfect Mastery!';
      return 'Flawless Perfection!';
    } else if (percentageScore >= 90) {
      return 'Excellent Craftsmanship!';
    } else if (percentageScore >= 70) {
      return 'Well Done!';
    } else {
      return 'Potion Complete!';
    }
  };

  const getResultDescription = () => {
    if (percentageScore === 100) {
      return 'You have achieved perfect alchemical mastery! Every ingredient was correct, perfectly prepared, and timed to perfection.';
    } else if (percentageScore >= 90) {
      return 'Nearly perfect! Your potion shows exceptional skill and attention to detail across all challenges.';
    } else if (percentageScore >= 70) {
      return 'A solid effort! Your potion has good properties but could be refined with better timing and precision.';
    } else {
      return 'Your potion has some interesting properties, but mastering all three challenges will greatly improve your results...';
    }
  };

  const getPotionEffects = () => {
    if (percentageScore < 70) return [];

    const effects = {
      'Healing': ['Restores vitality', 'Heals wounds', 'Boosts immunity'],
      'Magic': ['Amplifies magical power', 'Enhances focus', 'Increases mana'],
      'Enhancement': ['Boosts physical abilities', 'Increases strength', 'Enhances endurance'],
      'Utility': ['Grants special abilities', 'Provides unique effects', 'Enhances senses'],
      'Transformation': ['Alters physical form', 'Changes appearance', 'Shifts abilities'],
      'Elemental': ['Elemental mastery', 'Resistance to elements', 'Elemental control'],
      'Legendary': ['Transcendent power', 'Mythical abilities', 'Divine enhancement'],
      'Exotic': ['Unusual effects', 'Rare properties', 'Unique abilities'],
      'Combat': ['Battle enhancement', 'Weapon mastery', 'Combat superiority']
    };

    return effects[recipe.category] || ['Mysterious effects'];
  };

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
        className="bg-stone-800 rounded-2xl p-8 max-w-lg w-full border border-stone-700 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${scoreInfo.bgColor}`}>
            <SafeIcon 
              icon={percentageScore === 100 ? FiStar : percentageScore >= 70 ? FiCheck : FiTarget} 
              className="w-8 h-8 text-white" 
            />
          </div>
          
          <h2 className="text-2xl font-medieval font-bold text-amber-400 mb-2">
            {getResultTitle()}
          </h2>
          
          <p className="text-stone-300 mb-4">
            {getResultDescription()}
          </p>

          {/* Percentage Score Display */}
          <div className="bg-stone-700/50 rounded-xl p-4 mb-4 border border-stone-600">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${scoreInfo.color}`}>
                {percentageScore}%
              </div>
              <div className={`text-lg font-medium ${scoreInfo.color}`}>
                {scoreInfo.category}
              </div>
              <div className="w-full bg-stone-600 rounded-full h-3 mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentageScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-3 rounded-full ${scoreInfo.bgColor}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Potion Bottle Visualization */}
        <div className="relative mb-6">
          <div className="w-40 h-52 mx-auto relative">
            {/* Bottle Body */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-stone-300/80 to-stone-400/90 rounded-b-3xl rounded-t-2xl border-3 border-stone-500 shadow-2xl">
              {/* Bottle Highlight */}
              <div className="absolute top-3 left-3 w-3 h-12 bg-white/40 rounded-full blur-sm"></div>
              
              {/* Potion Liquid */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '75%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-2 left-2 right-2 rounded-b-2xl opacity-90"
                style={{ backgroundColor: recipe.color }}
              >
                {/* Liquid Surface Shine */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-full"></div>
                
                {/* Magical Swirls in Liquid */}
                {percentageScore >= 70 && (
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-amber-50 rounded-lg px-3 py-2 border-2 border-amber-200 shadow-lg"
            >
              <div className="text-sm text-amber-800 font-medieval text-center font-bold">
                {recipe.name}
              </div>
              <div className="text-xs text-amber-600 text-center mt-1">
                {recipe.category}
              </div>
            </motion.div>
            
            {/* Magical Aura based on score */}
            <motion.div
              animate={{
                opacity: percentageScore >= 90 ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
                scale: percentageScore >= 90 ? [1, 1.15, 1] : [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className={`absolute inset-0 rounded-3xl blur-xl ${
                percentageScore === 100 ? 'bg-yellow-400/30' :
                percentageScore >= 90 ? 'bg-green-400/25' :
                percentageScore >= 70 ? 'bg-blue-400/20' :
                'bg-orange-400/15'
              }`}
            ></motion.div>
            
            {/* Enhanced Sparkle Effects */}
            {percentageScore >= 70 && (
              <div className="absolute inset-0">
                {[...Array(percentageScore === 100 ? 12 : 8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      percentageScore === 100 ? 'bg-yellow-300' : 'bg-amber-300'
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
          </div>
        </div>

        {/* Potion Effects (if good score) */}
        {percentageScore >= 70 && (
          <div className="mb-6">
            <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-700">
              <div className="flex items-center mb-3">
                <SafeIcon icon={FiZap} className="w-5 h-5 text-emerald-400 mr-2" />
                <h3 className="font-semibold text-emerald-400">Potion Effects:</h3>
              </div>
              <ul className="space-y-1">
                {getPotionEffects().map((effect, index) => (
                  <li key={index} className="flex items-center text-emerald-300 text-sm">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2"></div>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Detailed Breakdown - NOW WITH THREE CHALLENGES */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medieval font-semibold text-amber-400">
            Triple Challenge Analysis
          </h3>

          {/* Ingredients Analysis */}
          <div className={`rounded-lg p-3 border ${
            ingredientsMatch ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <SafeIcon 
                  icon={ingredientsMatch ? FiCheck : FiX} 
                  className={`w-4 h-4 mr-2 ${ingredientsMatch ? 'text-emerald-400' : 'text-red-400'}`} 
                />
                <span className={`font-medium ${ingredientsMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                  Ingredients & Order
                </span>
              </div>
              <span className={`font-bold ${ingredientsMatch ? 'text-emerald-300' : 'text-red-300'}`}>
                {ingredientScore}/33
              </span>
            </div>
            {ingredientsMatch ? (
              <div className="text-emerald-300 text-sm">Perfect ingredient selection and order!</div>
            ) : (
              <div className="text-red-300 text-sm">Wrong ingredients or incorrect order</div>
            )}
          </div>

          {/* Preparations Analysis */}
          <div className={`rounded-lg p-3 border ${
            preparationsMatch ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <SafeIcon 
                  icon={preparationsMatch ? FiTool : FiX} 
                  className={`w-4 h-4 mr-2 ${preparationsMatch ? 'text-emerald-400' : 'text-red-400'}`} 
                />
                <span className={`font-medium ${preparationsMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                  Preparation Methods
                </span>
              </div>
              <span className={`font-bold ${preparationsMatch ? 'text-emerald-300' : 'text-red-300'}`}>
                {preparationScore}/33
              </span>
            </div>
            {preparationsMatch ? (
              <div className="text-emerald-300 text-sm">Perfect preparation techniques!</div>
            ) : (
              <div className="text-red-300 text-sm">Incorrect preparation methods used</div>
            )}
          </div>

          {/* NEW: Timing Analysis */}
          <div className={`rounded-lg p-3 border ${
            timingAccuracy && timingAccuracy.perfect === timingAccuracy.total ? 'bg-emerald-900/30 border-emerald-700' :
            timingAccuracy && timingAccuracy.perfect + timingAccuracy.good === timingAccuracy.total ? 'bg-yellow-900/30 border-yellow-700' :
            'bg-red-900/30 border-red-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <SafeIcon 
                  icon={FiClock} 
                  className={`w-4 h-4 mr-2 ${
                    timingAccuracy && timingAccuracy.perfect === timingAccuracy.total ? 'text-emerald-400' :
                    timingAccuracy && timingAccuracy.perfect + timingAccuracy.good === timingAccuracy.total ? 'text-yellow-400' :
                    'text-red-400'
                  }`} 
                />
                <span className={`font-medium ${
                  timingAccuracy && timingAccuracy.perfect === timingAccuracy.total ? 'text-emerald-400' :
                  timingAccuracy && timingAccuracy.perfect + timingAccuracy.good === timingAccuracy.total ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  Timing Precision
                </span>
              </div>
              <span className={`font-bold ${
                timingAccuracy && timingAccuracy.perfect === timingAccuracy.total ? 'text-emerald-300' :
                timingAccuracy && timingAccuracy.perfect + timingAccuracy.good === timingAccuracy.total ? 'text-yellow-300' :
                'text-red-300'
              }`}>
                {timingScore}/34
              </span>
            </div>
            {timingAccuracy && (
              <div className="text-sm space-y-1">
                <div className={`${
                  timingAccuracy.perfect === timingAccuracy.total ? 'text-emerald-300' :
                  timingAccuracy.perfect + timingAccuracy.good === timingAccuracy.total ? 'text-yellow-300' :
                  'text-red-300'
                }`}>
                  Perfect: {timingAccuracy.perfect}/{timingAccuracy.total} • Good: {timingAccuracy.good}/{timingAccuracy.total} • Missed: {timingAccuracy.poor}/{timingAccuracy.total}
                </div>
                {timingAccuracy.perfect === timingAccuracy.total ? (
                  <div className="text-emerald-300 text-xs">Flawless timing on all preparations!</div>
                ) : (
                  <div className="text-red-300 text-xs">Click in the GREEN zone for perfect timing</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <SafeIcon icon={FiAward} className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium">Rewards:</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${scoreInfo.bgColor} text-white`}>
              {percentageScore}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-amber-300">Gold Coins:</span>
              <span className="text-amber-200 font-bold text-lg">{points}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-300">Experience:</span>
              <span className="text-amber-200 font-bold text-lg">{points}</span>
            </div>
            {bonusPoints > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-yellow-300">Perfect Bonus:</span>
                <span className="text-yellow-200 font-bold">+{bonusPoints}</span>
              </div>
            )}
          </div>
          {percentageScore < 100 && (
            <p className="text-amber-300 text-sm mt-2">
              💡 Master all THREE challenges for maximum rewards: Ingredients + Methods + Timing!
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