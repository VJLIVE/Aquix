import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-discord"></i></a>
      </div>
      <div className="footer-text">
        <p>Join the AQUiX community and dive into the world of adventure.</p>
      </div>
      <div className="footer-links">
        <a href="#">Privacy Notice</a> |
        <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
