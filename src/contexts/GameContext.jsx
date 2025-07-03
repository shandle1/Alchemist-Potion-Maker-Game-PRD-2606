import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  currentLevel: 1,
  score: 0,
  experience: 0,
  showTutorial: false,
  currentRecipe: null,
  selectedIngredients: [],
  gamePhase: 'auth', // auth, tutorial, playing, completed
  recipes: [
    {
      id: 1,
      name: 'Healing Potion',
      description: 'A simple healing elixir to restore vitality.',
      ingredients: ['Red Mushroom', 'Spring Water', 'Mint Leaves'],
      color: '#ef4444',
      level: 1,
      points: 100
    },
    {
      id: 2,
      name: 'Mana Potion',
      description: 'Restores magical energy and focus.',
      ingredients: ['Blue Crystal', 'Moonwater', 'Sage'],
      color: '#3b82f6',
      level: 1,
      points: 120
    },
    {
      id: 3,
      name: 'Strength Elixir',
      description: 'Enhances physical prowess temporarily.',
      ingredients: ['Bear Claw', 'Fire Root', 'Iron Dust'],
      color: '#f59e0b',
      level: 2,
      points: 150
    }
  ],
  availableIngredients: [
    { id: 1, name: 'Red Mushroom', icon: '🍄', rarity: 'common' },
    { id: 2, name: 'Spring Water', icon: '💧', rarity: 'common' },
    { id: 3, name: 'Mint Leaves', icon: '🌿', rarity: 'common' },
    { id: 4, name: 'Blue Crystal', icon: '💎', rarity: 'rare' },
    { id: 5, name: 'Moonwater', icon: '🌙', rarity: 'rare' },
    { id: 6, name: 'Sage', icon: '🌱', rarity: 'common' },
    { id: 7, name: 'Bear Claw', icon: '🐻', rarity: 'epic' },
    { id: 8, name: 'Fire Root', icon: '🔥', rarity: 'rare' },
    { id: 9, name: 'Iron Dust', icon: '⚡', rarity: 'common' },
    { id: 10, name: 'Dragon Scale', icon: '🐲', rarity: 'legendary' },
    { id: 11, name: 'Phoenix Feather', icon: '🔥', rarity: 'legendary' },
    { id: 12, name: 'Starlight Essence', icon: '✨', rarity: 'epic' }
  ]
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        gamePhase: action.payload.isFirstTime ? 'tutorial' : 'playing',
        showTutorial: action.payload.isFirstTime
      };
    case 'LOGOUT':
      return {
        ...initialState,
        gamePhase: 'auth'
      };
    case 'START_TUTORIAL':
      return {
        ...state,
        showTutorial: true,
        gamePhase: 'tutorial'
      };
    case 'COMPLETE_TUTORIAL':
      return {
        ...state,
        showTutorial: false,
        gamePhase: 'playing'
      };
    case 'SELECT_RECIPE':
      return {
        ...state,
        currentRecipe: action.payload,
        selectedIngredients: []
      };
    case 'ADD_INGREDIENT':
      if (state.selectedIngredients.length >= 3) return state;
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload]
      };
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (_, index) => index !== action.payload
        )
      };
    case 'CRAFT_POTION':
      const recipe = state.currentRecipe;
      const correct = recipe.ingredients.every(ingredient =>
        state.selectedIngredients.some(selected => selected.name === ingredient)
      ) && state.selectedIngredients.length === recipe.ingredients.length;
      
      const points = correct ? recipe.points : Math.floor(recipe.points * 0.3);
      
      return {
        ...state,
        score: state.score + points,
        experience: state.experience + points,
        currentLevel: Math.floor((state.experience + points) / 500) + 1,
        selectedIngredients: [],
        gamePhase: 'completed'
      };
    case 'NEXT_RECIPE':
      const availableRecipes = state.recipes.filter(r => r.level <= state.currentLevel);
      const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
      return {
        ...state,
        currentRecipe: randomRecipe,
        gamePhase: 'playing'
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload
      };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Load saved game state
    const savedState = localStorage.getItem('alchemist-game-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.user) {
          dispatch({ type: 'LOGIN', payload: parsed.user });
        }
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save game state
    if (state.isAuthenticated) {
      localStorage.setItem('alchemist-game-state', JSON.stringify({
        user: state.user,
        currentLevel: state.currentLevel,
        score: state.score,
        experience: state.experience
      }));
    }
  }, [state.isAuthenticated, state.user, state.currentLevel, state.score, state.experience]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}