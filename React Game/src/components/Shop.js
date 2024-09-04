// src/components/Shop.js

import React from 'react';
import './shop.css';

const Shop = ({ items }) => (
  <div className="shop">
    <h2>Shop</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button>Buy</button>
          <button>Sell</button>
        </li>
      ))}
    </ul>
  </div>
);

export default Shop;
