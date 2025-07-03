import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiScissors, FiZap, FiDroplet, FiRotateCw, FiHammer, FiFlame, FiWind, FiSun, FiMoon, FiShield, FiBook, FiX, FiEye, FiAlertTriangle } = FiIcons;

// Preparation methods with ingredient type compatibility
const preparationMethods = {
  // Solid ingredient methods
  chop: { icon: FiScissors, color: 'text-orange-500', description: 'Chop finely with precision', compatibleTypes: ['solid'] },
  crush: { icon: FiHammer, color: 'text-red-500', description: 'Crush into powder', compatibleTypes: ['solid'] },
  grind: { icon: FiHammer, color: 'text-stone-500', description: 'Grind into fine particles', compatibleTypes: ['solid'] },
  carve: { icon: FiScissors, color: 'text-stone-600', description: 'Carve intricate symbols', compatibleTypes: ['solid'] },
  pound: { icon: FiHammer, color: 'text-stone-700', description: 'Pound with rhythmic strikes', compatibleTypes: ['solid'] },
  forge: { icon: FiHammer, color: 'text-red-800', description: 'Forge with elemental heat', compatibleTypes: ['solid'] },
  shatter: { icon: FiHammer, color: 'text-red-700', description: 'Shatter with controlled force', compatibleTypes: ['solid'] },
  polish: { icon: FiRotateCw, color: 'text-gray-400', description: 'Polish to perfection', compatibleTypes: ['solid'] },
  pluck: { icon: FiScissors, color: 'text-amber-600', description: 'Pluck at the perfect moment', compatibleTypes: ['solid'] },
  scale: { icon: FiScissors, color: 'text-blue-600', description: 'Scale with precision', compatibleTypes: ['solid'] },

  // Liquid ingredient methods
  boil: { icon: FiDroplet, color: 'text-blue-500', description: 'Boil until essence emerges', compatibleTypes: ['liquid'] },
  purify: { icon: FiShield, color: 'text-cyan-500', description: 'Purify with sacred rituals', compatibleTypes: ['liquid'] },
  dissolve: { icon: FiDroplet, color: 'text-blue-400', description: 'Dissolve completely', compatibleTypes: ['liquid', 'powder'] },
  heat: { icon: FiFlame, color: 'text-red-600', description: 'Heat to perfect temperature', compatibleTypes: ['liquid'] },
  steep: { icon: FiDroplet, color: 'text-green-400', description: 'Steep in magical waters', compatibleTypes: ['liquid'] },
  extract: { icon: FiDroplet, color: 'text-green-600', description: 'Extract vital compounds', compatibleTypes: ['liquid', 'solid'] },

  // Gas/essence methods
  capture: { icon: FiWind, color: 'text-cyan-400', description: 'Capture fleeting essence', compatibleTypes: ['gas'] },
  concentrate: { icon: FiDroplet, color: 'text-indigo-600', description: 'Concentrate the essence', compatibleTypes: ['gas', 'liquid'] },
  condense: { icon: FiWind, color: 'text-gray-500', description: 'Condense vaporous essence', compatibleTypes: ['gas'] },

  // Universal methods - BURN IS HERE!
  burn: { icon: FiFlame, color: 'text-red-600', description: 'Burn to release magical properties', compatibleTypes: ['solid', 'liquid', 'gas', 'powder'] },
  mix: { icon: FiRotateCw, color: 'text-purple-500', description: 'Mix with careful circular motions', compatibleTypes: ['solid', 'liquid', 'powder'] },
  enchant: { icon: FiZap, color: 'text-yellow-500', description: 'Enchant with magical energy', compatibleTypes: ['solid', 'liquid', 'gas'] },
  infuse: { icon: FiSun, color: 'text-amber-500', description: 'Infuse with moonlight', compatibleTypes: ['solid', 'liquid', 'gas'] },
  channel: { icon: FiZap, color: 'text-purple-600', description: 'Channel arcane energies', compatibleTypes: ['solid', 'liquid', 'gas'] },
  weave: { icon: FiRotateCw, color: 'text-indigo-500', description: 'Weave magical patterns', compatibleTypes: ['solid', 'gas'] },
  activate: { icon: FiZap, color: 'text-yellow-600', description: 'Activate dormant powers', compatibleTypes: ['solid', 'liquid', 'gas'] },
  sanctify: { icon: FiShield, color: 'text-white', description: 'Sanctify with holy energy', compatibleTypes: ['solid', 'liquid', 'gas'] },
  roast: { icon: FiFlame, color: 'text-orange-600', description: 'Roast over mystical flames', compatibleTypes: ['solid'] },
  dry: { icon: FiSun, color: 'text-yellow-400', description: 'Dry under sacred sunlight', compatibleTypes: ['solid', 'liquid'] },
  charge: { icon: FiZap, color: 'text-blue-600', description: 'Charge with lightning energy', compatibleTypes: ['solid', 'liquid', 'gas'] },
  focus: { icon: FiSun, color: 'text-yellow-500', description: 'Focus light through crystal', compatibleTypes: ['solid'] },
  filter: { icon: FiWind, color: 'text-cyan-500', description: 'Filter through enchanted cloth', compatibleTypes: ['liquid'] },
  aerate: { icon: FiWind, color: 'text-blue-300', description: 'Aerate with gentle winds', compatibleTypes: ['liquid'] },
  phase: { icon: FiMoon, color: 'text-purple-400', description: 'Phase between dimensions', compatibleTypes: ['gas'] },
  scatter: { icon: FiWind, color: 'text-gray-600', description: 'Scatter like stardust', compatibleTypes: ['powder'] },
  wither: { icon: FiMoon, color: 'text-purple-700', description: 'Wither under moonlight', compatibleTypes: ['solid'] },
  levitate: { icon: FiWind, color: 'text-cyan-300', description: 'Levitate with air magic', compatibleTypes: ['solid'] },
  whip: { icon: FiRotateCw, color: 'text-white', description: 'Whip into ethereal foam', compatibleTypes: ['liquid'] },
  suspend: { icon: FiWind, color: 'text-gray-300', description: 'Suspend in magical field', compatibleTypes: ['solid', 'liquid'] },
  sift: { icon: FiWind, color: 'text-green-500', description: 'Sift through magical mesh', compatibleTypes: ['powder'] },
  bloom: { icon: FiSun, color: 'text-pink-500', description: 'Allow to bloom naturally', compatibleTypes: ['solid'] }
};

function IngredientPreparation() {
  const { state, dispatch } = useGame();
  const [selectedMethod, setSelectedMethod] = useState({});
  const [completedPreparations, setCompletedPreparations] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);

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

  const handlePrepare = (ingredientIndex) => {
    const method = selectedMethod[ingredientIndex];
    if (!method) return;

    const requiredMethod = state.currentRecipe.preparations[ingredientIndex];
    const isCorrect = method === requiredMethod;

    dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: {
        ingredientIndex,
        method,
        isCorrect
      }
    });

    setCompletedPreparations(prev => [...prev, ingredientIndex]);
  };

  const handleContinue = () => {
    dispatch({ type: 'CRAFT_POTION' });
  };

  const allPreparationsComplete = completedPreparations.length === state.selectedIngredients.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-stone-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-700 shadow-2xl relative"
      >
        {/* Recipe Reference Button */}
        <button
          onClick={() => setShowRecipe(true)}
          className="absolute top-4 right-16 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-xl transition-all duration-300 shadow-lg"
          title="View Recipe"
        >
          <SafeIcon icon={FiBook} className="w-5 h-5" />
        </button>

        {/* Close Button */}
        <button
          onClick={() => dispatch({ type: 'SELECT_RECIPE', payload: state.currentRecipe })}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-300 transition-colors"
          title="Back to Laboratory"
        >
          <SafeIcon icon={FiX} className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-medieval font-bold text-amber-400 mb-2">
            Ingredient Preparation
          </h2>
          <p className="text-stone-300">
            Each ingredient must be prepared with the correct method to create the perfect potion
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {state.selectedIngredients.map((ingredient, index) => {
            const isCompleted = completedPreparations.includes(index);
            const requiredMethod = state.currentRecipe.preparations[index];
            const selectedMethodForIngredient = selectedMethod[index];
            const ingredientType = getIngredientType(ingredient.name);
            const compatibleMethods = getCompatibleMethods(ingredientType);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-stone-700 rounded-xl p-4 border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-900/20' 
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
                      {!preparationMethods[requiredMethod]?.compatibleTypes.includes(ingredientType) && (
                        <div className="flex items-center text-red-300 text-xs mt-1">
                          <SafeIcon icon={FiAlertTriangle} className="w-3 h-3 mr-1" />
                          <span>Warning: Method may not be compatible with ingredient type!</span>
                        </div>
                      )}
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
                            className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                              selectedMethodForIngredient === method
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

                    {/* Selected Method Description */}
                    {selectedMethodForIngredient && (
                      <div className="mb-4 p-3 bg-stone-600/50 rounded-lg">
                        <div className="text-xs text-stone-300">
                          {preparationMethods[selectedMethodForIngredient].description}
                        </div>
                        {selectedMethodForIngredient === requiredMethod && (
                          <div className="text-xs text-green-400 mt-1 font-medium">
                            ✓ Perfect match!
                          </div>
                        )}
                      </div>
                    )}

                    {/* Prepare Button */}
                    <button
                      onClick={() => handlePrepare(index)}
                      disabled={!selectedMethodForIngredient}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        selectedMethodForIngredient
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                          : 'bg-stone-600 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Prepare Ingredient
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <SafeIcon 
                        icon={preparationMethods[selectedMethod[index]]?.icon || FiScissors} 
                        className="w-6 h-6 text-white" 
                      />
                    </div>
                    <div className="text-green-400 font-medium">
                      Preparation Complete!
                    </div>
                    <div className="text-xs text-stone-400 mt-1">
                      Method: {selectedMethod[index]}
                    </div>
                    {selectedMethod[index] === requiredMethod && (
                      <div className="text-xs text-green-400 mt-1 font-medium">
                        ✓ Perfect preparation!
                      </div>
                    )}
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
              : `Prepare All Ingredients (${completedPreparations.length}/${state.selectedIngredients.length})`
            }
          </motion.button>
        </div>

        {/* Hint */}
        <div className="mt-6 text-center text-stone-400 text-sm">
          <p>💡 Tip: Different ingredient types require different preparation methods!</p>
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

              {/* Instructions */}
              <div className="bg-stone-100 rounded-lg p-4 border-l-4 border-stone-400">
                <p className="text-stone-700 text-sm italic">
                  "Follow these exact preparation methods in order to achieve the perfect {state.currentRecipe.name}. 
                  Each ingredient must be prepared with precision to unlock its magical properties."
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