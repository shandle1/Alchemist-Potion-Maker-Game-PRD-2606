import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiTrendingUp, FiDollarSign } = FiIcons;

function PlayerStats() {
  const { state } = useGame();
  const progressToNextLevel = (state.experience % 500) / 500;

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Level */}
      <div className="flex items-center space-x-2 bg-stone-700/50 px-3 py-1 rounded-full">
        <SafeIcon icon={FiStar} className="w-4 h-4 text-amber-400" />
        <span className="text-amber-400 font-medium">Level {state.currentLevel}</span>
      </div>

      {/* Score/Money */}
      <div className="flex items-center space-x-2 bg-stone-700/50 px-3 py-1 rounded-full">
        <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 font-medium">{state.score}</span>
      </div>

      {/* Experience Progress - Moved to new line on mobile */}
      <div className="flex items-center space-x-2 min-w-0">
        <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <div className="w-24 sm:w-32 h-2 bg-stone-700 rounded-full overflow-hidden flex-shrink-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextLevel * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
        <span className="text-blue-400 text-xs whitespace-nowrap">
          {state.experience % 500}/500
        </span>
      </div>
    </div>
  );
}

export default PlayerStats;