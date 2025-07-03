import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiStar, FiArrowRight, FiAward, FiZap, FiTool, FiTarget } = FiIcons;

function PotionResult({ recipe, selectedIngredients, onNext }) {
  const { state } = useGame();

  // Check if ingredients match (correct ingredients in correct order)
  const ingredientsMatch = recipe.ingredients.length === selectedIngredients.length &&
    recipe.ingredients.every((ingredient, index) => 
      selectedIngredients[index] && selectedIngredients[index].name === ingredient
    );

  // Check if preparations match - Fixed logic
  const preparationsMatch = recipe.preparations.length === state.preparedIngredients.length &&
    recipe.preparations.every((requiredPreparation, recipeIndex) => {
      // Find the preparation for this recipe ingredient
      const preparation = state.preparedIngredients.find(prep => 
        prep.ingredientIndex === recipeIndex && prep.method === requiredPreparation
      );
      return preparation !== undefined;
    });

  // Calculate percentage score
  const calculateScore = () => {
    let score = 0;
    
    // Ingredients scoring (50% of total)
    if (ingredientsMatch) {
      score += 50;
    } else {
      // Partial credit for having some correct ingredients
      let correctCount = 0;
      recipe.ingredients.forEach((ingredient, index) => {
        if (selectedIngredients[index] && selectedIngredients[index].name === ingredient) {
          correctCount++;
        }
      });
      score += Math.floor((correctCount / recipe.ingredients.length) * 50);
    }
    
    // Preparation scoring (50% of total)
    if (preparationsMatch) {
      score += 50;
    } else {
      // Partial credit for correct preparations
      let correctPrepCount = 0;
      recipe.preparations.forEach((requiredPrep, index) => {
        const prep = state.preparedIngredients.find(p => 
          p.ingredientIndex === index && p.method === requiredPrep
        );
        if (prep) correctPrepCount++;
      });
      score += Math.floor((correctPrepCount / recipe.preparations.length) * 50);
    }
    
    return Math.max(0, Math.min(100, score));
  };

  const percentageScore = calculateScore();

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

  // Calculate detailed scores for display
  const ingredientScore = ingredientsMatch ? 50 : Math.floor((selectedIngredients.filter((selected, index) => 
    recipe.ingredients[index] === selected.name
  ).length / recipe.ingredients.length) * 50);

  const preparationScore = preparationsMatch ? 50 : Math.floor((recipe.preparations.filter((requiredPrep, index) => {
    const prep = state.preparedIngredients.find(p => 
      p.ingredientIndex === index && p.method === requiredPrep
    );
    return prep !== undefined;
  }).length / recipe.preparations.length) * 50);

  const pointsEarned = Math.floor(recipe.points * (percentageScore / 100));
  const bonusPoints = percentageScore === 100 && recipe.level >= 5 ? Math.floor(recipe.points * 0.2) : 0;

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
      return 'You have achieved perfect alchemical mastery! Every ingredient was correct and perfectly prepared.';
    } else if (percentageScore >= 90) {
      return 'Nearly perfect! Your potion shows exceptional skill and attention to detail.';
    } else if (percentageScore >= 70) {
      return 'A solid effort! Your potion has good properties but could be refined further.';
    } else {
      return 'Your potion has some interesting properties, but there\'s room for improvement...';
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

  // Debug information (remove in production)
  console.log('🔍 Debug Info:', {
    selectedIngredients: selectedIngredients.map(ing => ing.name),
    requiredIngredients: recipe.ingredients,
    ingredientsMatch,
    preparedIngredients: state.preparedIngredients,
    requiredPreparations: recipe.preparations,
    preparationsMatch,
    percentageScore,
    ingredientScore,
    preparationScore
  });

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
            <SafeIcon icon={percentageScore === 100 ? FiStar : percentageScore >= 70 ? FiCheck : FiTarget} className="w-8 h-8 text-white" />
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
              style={{ backgroundColor: recipe.color }}
            />
            {/* Bottle Neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-stone-600 rounded-t-lg"></div>
            {/* Cork */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-amber-800 rounded-full"></div>
            
            {/* Magical Effects */}
            {percentageScore >= 70 && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
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
          
          {/* Potion Name and Category */}
          <div className="text-center mt-4">
            <h3 className="text-lg font-medieval font-bold text-amber-400">
              {recipe.name}
            </h3>
            <p className="text-stone-400 text-sm">{recipe.category} Potion</p>
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

        {/* Detailed Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medieval font-semibold text-amber-400">
            Brewing Analysis
          </h3>
          
          {/* Debug Info for Testing */}
          <div className="bg-stone-900/50 rounded-lg p-3 border border-stone-600 text-xs">
            <div className="text-stone-300 mb-2">Debug Info:</div>
            <div className="text-stone-400 space-y-1">
              <div>Selected: {selectedIngredients.map(ing => ing.name).join(', ')}</div>
              <div>Required: {recipe.ingredients.join(', ')}</div>
              <div>Preparations: {state.preparedIngredients.map(p => `${p.ingredientIndex}:${p.method}`).join(', ')}</div>
              <div>Required Prep: {recipe.preparations.join(', ')}</div>
            </div>
          </div>
          
          {/* Ingredients Analysis */}
          <div className="grid grid-cols-1 gap-3">
            {/* Ingredients Score */}
            <div className={`rounded-lg p-3 border ${ingredientsMatch ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <SafeIcon icon={ingredientsMatch ? FiCheck : FiX} className={`w-4 h-4 mr-2 ${ingredientsMatch ? 'text-emerald-400' : 'text-red-400'}`} />
                  <span className={`font-medium ${ingredientsMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                    Ingredients & Order
                  </span>
                </div>
                <span className={`font-bold ${ingredientsMatch ? 'text-emerald-300' : 'text-red-300'}`}>
                  {ingredientScore}/50
                </span>
              </div>
              {ingredientsMatch ? (
                <div className="text-emerald-300 text-sm">Perfect ingredient selection and order!</div>
              ) : (
                <div className="text-red-300 text-sm">Wrong ingredients or incorrect order</div>
              )}
            </div>

            {/* Preparations Score */}
            <div className={`rounded-lg p-3 border ${preparationsMatch ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <SafeIcon icon={preparationsMatch ? FiTool : FiX} className={`w-4 h-4 mr-2 ${preparationsMatch ? 'text-emerald-400' : 'text-red-400'}`} />
                  <span className={`font-medium ${preparationsMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                    Preparation Methods
                  </span>
                </div>
                <span className={`font-bold ${preparationsMatch ? 'text-emerald-300' : 'text-red-300'}`}>
                  {preparationScore}/50
                </span>
              </div>
              {preparationsMatch ? (
                <div className="text-emerald-300 text-sm">Perfect preparation techniques!</div>
              ) : (
                <div className="text-red-300 text-sm">Incorrect preparation methods used</div>
              )}
            </div>
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
              <span className="text-amber-200 font-bold text-lg">{pointsEarned}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-300">Experience:</span>
              <span className="text-amber-200 font-bold text-lg">{pointsEarned}</span>
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
              💡 Achieve 100% for perfect rewards and mastery bonuses!
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