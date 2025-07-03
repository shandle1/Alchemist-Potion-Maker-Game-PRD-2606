import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiList, FiTarget, FiStar, FiAward, FiTool, FiUser, FiClock } = FiIcons;

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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Healing': return 'text-red-600 bg-red-100 border-red-300';
      case 'Magic': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'Enhancement': return 'text-amber-600 bg-amber-100 border-amber-300';
      case 'Utility': return 'text-green-600 bg-green-100 border-green-300';
      case 'Transformation': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'Elemental': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'Exotic': return 'text-pink-600 bg-pink-100 border-pink-300';
      case 'Combat': return 'text-red-800 bg-red-200 border-red-400';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-stone-600 bg-stone-100';
    }
  };

  const getDifficultyStars = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`w-4 h-4 ${i < level ? 'text-amber-400 fill-current' : 'text-stone-300'}`}
      />
    ));
  };

  const customer = state.currentRecipe.customer;

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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-medieval font-bold text-stone-800">
            Customer Request
          </h2>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(state.currentRecipe.category)}`}>
            {state.currentRecipe.category}
          </div>
        </div>
        <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <div className="bg-stone-100 rounded-lg p-4 border-l-4 border-amber-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <SafeIcon icon={FiUser} className="w-5 h-5 text-stone-600 mr-2" />
              <span className="font-bold text-stone-800">{customer.name}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(customer.urgency)}`}>
              <SafeIcon icon={FiClock} className="w-3 h-3 inline mr-1" />
              {customer.urgency.charAt(0).toUpperCase() + customer.urgency.slice(1)} Priority
            </div>
          </div>
          <p className="text-stone-600 text-sm italic">{customer.personality}</p>
          <p className="text-stone-700 text-sm mt-2">{customer.story}</p>
        </div>
      </div>

      {/* Customer Request */}
      <div className="mb-6">
        <div className="bg-amber-100 rounded-lg p-4 border-l-4 border-amber-600">
          <p className="text-amber-900 italic leading-relaxed">
            "{customer.request}"
          </p>
        </div>
      </div>

      {/* Potion Details */}
      <div className="mb-4">
        <h3 className="text-xl font-medieval font-bold text-stone-800 mb-2">
          {state.currentRecipe.name}
        </h3>
        <p className="text-stone-700 mb-4">{state.currentRecipe.description}</p>
        
        {/* Difficulty Rating */}
        <div className="bg-stone-100 rounded-lg p-3 border-l-4 border-stone-400 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SafeIcon icon={FiAward} className="w-5 h-5 text-stone-600 mr-2" />
              <span className="font-semibold text-stone-700">Difficulty:</span>
            </div>
            <div className="flex items-center space-x-1">
              {getDifficultyStars(state.currentRecipe.level)}
              <span className="ml-2 text-stone-600 text-sm">Level {state.currentRecipe.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Required Ingredients */}
      <div className="mb-4">
        <div className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-600">
          <div className="flex items-center mb-3">
            <SafeIcon icon={FiList} className="w-5 h-5 text-blue-700 mr-2" />
            <h3 className="font-semibold text-blue-800">Required Ingredients:</h3>
          </div>
          <ul className="space-y-2">
            {state.currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-blue-900">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preparation Methods */}
      <div className="mb-4">
        <div className="bg-purple-100 rounded-lg p-4 border-l-4 border-purple-600">
          <div className="flex items-center mb-3">
            <SafeIcon icon={FiTool} className="w-5 h-5 text-purple-700 mr-2" />
            <h3 className="font-semibold text-purple-800">Preparation Methods:</h3>
          </div>
          <ul className="space-y-2">
            {state.currentRecipe.preparations.map((preparation, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                <span className="text-purple-900 capitalize">{preparation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reward */}
      <div className="mb-6">
        <div className="bg-emerald-100 rounded-lg p-4 border-l-4 border-emerald-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-emerald-700 mr-2" />
              <h3 className="font-semibold text-emerald-800">Reward:</h3>
            </div>
            <div className="text-right">
              <p className="text-emerald-900 font-bold text-lg">{state.currentRecipe.points} Gold</p>
              <p className="text-emerald-700 text-sm">+ {state.currentRecipe.points} XP</p>
            </div>
          </div>
          <p className="text-emerald-800 text-sm italic">
            Payment: {customer.payment}
          </p>
        </div>
      </div>

      {/* Signature */}
      <div className="text-right">
        <p className="text-stone-600 text-sm italic">
          - {customer.name}
        </p>
        <p className="text-stone-500 text-xs">
          {customer.personality}
        </p>
      </div>
    </motion.div>
  );
}

export default RecipeLetter;