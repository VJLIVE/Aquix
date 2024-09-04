// src/components/Map.js

import React from 'react';
import './map.css';

const Map = ({ onClose }) => (
  <div className="map">
    <h2>Island Map</h2>
    <button onClick={onClose}>Close Map</button>
    {/* Render the map here */}
  </div>
);

export default Map;
