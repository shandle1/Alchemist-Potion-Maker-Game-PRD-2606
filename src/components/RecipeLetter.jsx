import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiList, FiTarget } = FiIcons;

function RecipeLetter() {
  const { state } = useGame();

  if (!state.currentRecipe) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-stone-800/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-700 shadow-xl"
      >
        <div className="text-center text-stone-400">
          <SafeIcon icon={FiMail} className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No recipe selected</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-amber-50 rounded-2xl p-6 shadow-xl border-2 border-amber-200 relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Wax Seal */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
        <SafeIcon icon={FiMail} className="w-6 h-6 text-white" />
      </div>

      {/* Letter Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-medieval font-bold text-stone-800 mb-2">
          Customer Request
        </h2>
        <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
      </div>

      {/* Letter Content */}
      <div className="space-y-4 font-fantasy text-stone-700">
        <p className="italic text-lg">
          "Dear Master Alchemist,"
        </p>
        
        <p className="leading-relaxed">
          I am in urgent need of a <strong className="text-amber-800">{state.currentRecipe.name}</strong>. 
          {state.currentRecipe.description}
        </p>

        <div className="bg-amber-100 rounded-lg p-4 border-l-4 border-amber-600">
          <div className="flex items-center mb-3">
            <SafeIcon icon={FiList} className="w-5 h-5 text-amber-700 mr-2" />
            <h3 className="font-semibold text-amber-800">Required Ingredients:</h3>
          </div>
          <ul className="space-y-2">
            {state.currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                <span className="text-amber-900">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-emerald-100 rounded-lg p-4 border-l-4 border-emerald-600">
          <div className="flex items-center mb-2">
            <SafeIcon icon={FiTarget} className="w-5 h-5 text-emerald-700 mr-2" />
            <h3 className="font-semibold text-emerald-800">Reward:</h3>
          </div>
          <p className="text-emerald-900">{state.currentRecipe.points} Gold Coins</p>
        </div>

        <p className="italic text-base mt-6">
          "Please prepare this potion with the utmost care. Time is of the essence!"
        </p>
        
        <p className="text-right text-sm text-stone-600 mt-4">
          - A Grateful Customer
        </p>
      </div>
    </motion.div>
  );
}

export default RecipeLetter;