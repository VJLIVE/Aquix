// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Make sure this path is correct

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link to="/">
                    <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: 'white',marginLeft: '10px', fontSize: '30px', textShadow: '0 0 20px #00aaff' }}>
                        AQUIX
                    </h1>
                </Link>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="#">Let's Play</Link></li>
                <li><Link to="#">Leaderboard</Link></li>
                <li><Link to="#">Connect With Us</Link></li>
                <li><Link to="#">Support</Link></li>
            </ul>
            <div className="right-icons">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="login-btn">Sign up</Link>
            </div>
        </nav>
    );
};

export default Navbar;
