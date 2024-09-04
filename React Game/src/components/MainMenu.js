import React from 'react';
import './mm.css';

const MainMenu = ({ onStartGame }) => {
  return (
    <div className="fullscreen main-menu">
      <button onClick={onStartGame}>Play</button>
      <button>Settings</button>
      <button>View Points</button>
      <button>Shop</button>
    </div>
  );
};

export default MainMenu;
