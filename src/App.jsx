import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
          <Routes>
            <Route path="/" element={<AuthScreen />} />
            <Route path="/game" element={<GameScreen />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;