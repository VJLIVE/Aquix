// src/pages/Home.js
import React from 'react';
import Navbar from '../components/NavBar'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <img src="https://images.unsplash.com/photo-1502219540049-2a83a3ec63bc" alt="Aquix Background" />
        <div className="content-overlay">
          <p>An adventure and strategical, single-player game</p>
          <h1>AQUIX</h1>
          <a href="#" className="play-free-btn">PLAY FOR FREE</a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image">
          <img src="https://cdn.discordapp.com/attachments/1271876094324248748/1276233671346622495/Screenshot_615.png?ex=66ca1a3a&is=66c8c8ba&hm=c79b4d295d12cea5cffacc78f2ae66330bdb783f28d539363bdf6fb6c36c65a6&" alt="Console Launch" />
        </div>
        <div className="content">
          <h1>CONSOLE LAUNCH</h1>
          <p>VALORANT // YR 4</p>
          <a href="#" className="play-button">PLAY NOW</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
