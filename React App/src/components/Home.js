import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      
      <div className="main-content">
        <img
          src="https://imgs.search.brave.com/WsFGuDLWYbY7v0ipwG_ja_oxbYyPFL_9vMN9x-_qbDo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTQ0/ODEyNTQwL3Bob3Rv/L21vdW50YWluLWxh/bmRzY2FwZS1wb250/YS1kZWxnYWRhLWlz/bGFuZC1hem9yZXMu/d2VicD9iPTEmcz02/MTJ4NjEyJnc9MCZr/PTIwJmM9b1hvTUhW/OVJwM0JDVnZmclF5/MHUtalVaUnF5OWlM/ejNjMDRQZVlCc1VH/Yz0"
          alt="Aquix Background"
        />
        <div className="content-overlay">
          <p>An adventure and strategical, single player game</p>
          <h1 style={{fontFamily: "'Orbitron', sans-serif"}}>AQUIX</h1>
          <a href="#" className="play-free-btn">PLAY FOR FREE</a>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-image">
          <img
            src="https://cdn.discordapp.com/attachments/1271166826805465128/1277382120834207754/Screenshot_615.jpg?ex=66ccf64e&is=66cba4ce&hm=4bf27f66c84d4767d9e2a02ed69f76abdeca4d04d5e3bfd13240dab6eea95345&"
            alt="Console Launch"
          />
        </div>
        <div className="content">
          <h1>CONSOLE LAUNCH</h1>
          <p>VALORANT // YR 4</p>
          <a href="#" className="play-button">PLAY NOW</a>
        </div>
      </div>

      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default Home;