// src/components/TileMap.js

import React, { useRef, useEffect } from 'react';
import './TileMap.css'; // Optional CSS for styling

const TileMap = ({ jsonDataUrl, tilesetImageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const loadMapData = async () => {
      try {
        // Fetch the tile map JSON data
        const response = await fetch(jsonDataUrl);
        const mapData = await response.json();

        // Load the tileset image
        const tilesetImage = new Image();
        tilesetImage.src = tilesetImageUrl;
        
        tilesetImage.onload = () => {
          const { tileWidth, tileHeight, width, height, layers } = mapData;

          // Clear the canvas
          canvas.width = width * tileWidth;
          canvas.height = height * tileHeight;
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw each layer
          layers.forEach(layer => {
            layer.data.forEach((tileIndex, index) => {
              if (tileIndex !== 0) { // Skip empty tiles
                const x = (index % width) * tileWidth;
                const y = Math.floor(index / width) * tileHeight;

                const tileX = (tileIndex - 1) % (tilesetImage.width / tileWidth) * tileWidth;
                const tileY = Math.floor((tileIndex - 1) / (tilesetImage.width / tileWidth)) * tileHeight;

                context.drawImage(
                  tilesetImage,
                  tileX, tileY, tileWidth, tileHeight,
                  x, y, tileWidth, tileHeight
                );
              }
            });
          });
        };

        tilesetImage.onerror = () => {
          console.error('Error loading tileset image.');
        };
      } catch (error) {
        console.error('Error fetching or parsing map data:', error);
      }
    };

    loadMapData();
  }, [jsonDataUrl, tilesetImageUrl]);

  return (
    <canvas
      ref={canvasRef}
      className="tile-map-canvas"
    />
  );
};

export default TileMap;
