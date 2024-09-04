// src/components/Player.js

import React from 'react';
import './player.css';

const Player = ({ position }) => {
  return (
    <div className="player" style={{ top: position.y, left: position.x }}>
      {/* Player representation, like a simple square or character image */}
    </div>
  );
};

export default Player;
