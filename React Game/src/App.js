// src/App.js

import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('title');

  const handleTitleFinish = () => {
    setCurrentScreen('menu');
  };

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  return (
    <div className="App">
      {currentScreen === 'title' && <TitleScreen onFinish={handleTitleFinish} />}
      {currentScreen === 'menu' && <MainMenu onStartGame={handleStartGame} />}
      {currentScreen === 'game' && <Game />}
    </div>
  );
}

export default App;
