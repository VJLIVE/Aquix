// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Ts.css';

const TitleScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // Show title for 4 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fullscreen title-screen">
      <h1 className="title">AQUIX</h1>
    </div>
  );
};

export default TitleScreen;
