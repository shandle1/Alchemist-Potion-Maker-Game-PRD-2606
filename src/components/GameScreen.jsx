import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import Laboratory from './Laboratory';
import Tutorial from './Tutorial';
import PlayerStats from './PlayerStats';
import RecipeLetter from './RecipeLetter';
import Store from './Store';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLogOut, FiHelpCircle, FiShoppingCart } = FiIcons;

function GameScreen() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [showStore, setShowStore] = useState(false);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/');
      return;
    }

    // Start with first recipe if none selected
    if (!state.currentRecipe && state.gamePhase === 'playing') {
      const firstRecipe = state.recipes.find(r => r.level <= state.currentLevel);
      if (firstRecipe) {
        dispatch({ type: 'SELECT_RECIPE', payload: firstRecipe });
      }
    }
  }, [state.isAuthenticated, state.currentRecipe, state.gamePhase, state.recipes, state.currentLevel, navigate, dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleShowTutorial = () => {
    dispatch({ type: 'START_TUTORIAL' });
  };

  const handleShowStore = () => {
    setShowStore(true);
  };

  const handleCloseStore = () => {
    setShowStore(false);
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 stone-texture">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-4 bg-stone-800/80 backdrop-blur-sm border-b border-stone-700"
      >
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-medieval font-bold text-amber-400">
                Alchemist's Laboratory
              </h1>
              <div className="text-stone-300 text-sm">
                Welcome, {state.user?.username}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <PlayerStats />
              <button
                onClick={handleShowStore}
                className="p-2 text-stone-400 hover:text-emerald-400 transition-colors"
                title="Open Store"
              >
                <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
              </button>
              <button
                onClick={handleShowTutorial}
                className="p-2 text-stone-400 hover:text-amber-400 transition-colors"
                title="Show Tutorial"
              >
                <SafeIcon icon={FiHelpCircle} className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-stone-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <SafeIcon icon={FiLogOut} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-medieval font-bold text-amber-400">
                  Alchemist's Laboratory
                </h1>
                <div className="text-stone-300 text-sm">
                  Welcome, {state.user?.username}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShowStore}
                  className="p-2 text-stone-400 hover:text-emerald-400 transition-colors"
                  title="Open Store"
                >
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShowTutorial}
                  className="p-2 text-stone-400 hover:text-amber-400 transition-colors"
                  title="Show Tutorial"
                >
                  <SafeIcon icon={FiHelpCircle} className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-stone-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Player Stats on separate line for mobile */}
            <div className="flex justify-center">
              <PlayerStats />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative">
        {state.showTutorial && <Tutorial />}
        {showStore && <Store isOpen={showStore} onClose={handleCloseStore} />}
        
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recipe Letter */}
          <div className="lg:col-span-1">
            <RecipeLetter />
          </div>

          {/* Laboratory */}
          <div className="lg:col-span-2">
            <Laboratory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;