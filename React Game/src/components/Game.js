// src/components/Game.js

import React, { useState, useEffect } from 'react';
import Player from './player';
import NPC from './NPC';
import Map from './Map';
import Inventory from './Inventory';
import Shop from './Shop';
import MainMenu from './MainMenu';
import './game.css';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
  const [showMap, setShowMap] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);

  const npcs = [
    { id: 1, name: 'NPC 1', position: { x: 200, y: 300 }, task: 'Collect water samples' },
    { id: 2, name: 'NPC 2', position: { x: 400, y: 500 }, task: 'Repair the water pump' },
    // Add more NPCs here
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key); // Debugging log
      setPlayerPosition(prev => {
        const movement = { ...prev };

        switch (event.key) {
          case 'ArrowUp':
          case 'w':
            movement.y = Math.max(0, prev.y - 10);
            break;
          case 'ArrowDown':
          case 's':
            movement.y = Math.min(window.innerHeight - 50, prev.y + 10);
            break;
          case 'ArrowLeft':
          case 'a':
            movement.x = Math.max(0, prev.x - 10);
            break;
          case 'ArrowRight':
          case 'd':
            movement.x = Math.min(window.innerWidth - 50, prev.x + 10);
            break;
          case 'm':
            setShowMap(prev => !prev);
            break;
          case 'e':
            setShowInventory(prev => !prev);
            break;
          case 'r':
            setShowShop(prev => !prev);
            break;
          default:
            break;
        }

        return movement;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMainMenu = () => {
    setShowMainMenu(prevState => !prevState);
  };

  return (
    <div className="game-world">
      <button className="main-menu-button" onClick={toggleMainMenu}>
        Main Menu
      </button>
      {showMainMenu && <MainMenu onStartGame={() => {}} />}
      <Player position={playerPosition} />
      {npcs.map((npc) => (
        <NPC key={npc.id} npcName={npc.name} position={npc.position} task={npc.task} />
      ))}
      {showMap && <Map onClose={() => setShowMap(false)} />}
      {showInventory && <Inventory items={[]} />}
      {showShop && <Shop items={[]} />}
    </div>
  );
};

export default Game;
