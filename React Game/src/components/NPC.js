// src/components/NPC.js

import React from 'react';
import './npc.css';

const NPC = ({ npcName, position, task }) => {
  return (
    <div className="npc" style={{ top: position.y, left: position.x }}>
      <p>{npcName}</p>
      <button onClick={() => alert(`Mission: ${task}`)}>Accept Mission</button>
    </div>
  );
};

export default NPC;
