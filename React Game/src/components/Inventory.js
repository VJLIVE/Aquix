// src/components/Inventory.js

import React from 'react';
import './inv.css';

const Inventory = ({ items }) => (
  <div className="inventory">
    <h2>Inventory</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Inventory;
