import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/letsplay.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Letsplay = () => {
  const navigate = useNavigate();
  
  const [buttonStates, setButtonStates] = useState({
    game1: { isDisabled: false, timeRemaining: 0 },
    game2: { isDisabled: false, timeRemaining: 0 },
    game3: { isDisabled: false, timeRemaining: 0 },
  });

  useEffect(() => {
    // Function to update button states based on timers
    const updateButtonStates = () => {
      const updatedStates = { ...buttonStates };
      Object.keys(updatedStates).forEach(game => {
        const savedEndTime = localStorage.getItem(`${game}EndTime`);
        if (savedEndTime) {
          const endTime = parseInt(savedEndTime);
          const currentTime = Date.now();
          const timeLeft = Math.max(0, endTime - currentTime);
          if (timeLeft > 0) {
            updatedStates[game].isDisabled = true;
            updatedStates[game].timeRemaining = Math.ceil(timeLeft / 1000); // in seconds
          } else {
            // Timer expired
            localStorage.removeItem(`${game}EndTime`);
            updatedStates[game].isDisabled = false;
            updatedStates[game].timeRemaining = 0;
          }
        }
      });
      setButtonStates(updatedStates);
    };

    updateButtonStates();

    // Set an interval to update the timer every second
    const intervalId = setInterval(updateButtonStates, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [buttonStates]);

  const startTimer = (game) => {
    const endTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    localStorage.setItem(`${game}EndTime`, endTime);
    setButtonStates(prevStates => ({
      ...prevStates,
      [game]: {
        isDisabled: true,
        timeRemaining: 2 * 60 * 60, // in seconds
      },
    }));
  };

  const handleClick = (game, path) => {
    if (!buttonStates[game].isDisabled) {
      startTimer(game);
      navigate(path);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="play-section">
          <div className="play-container">
            <div className="play-box">
              <img 
                src="https://imgs.search.brave.com/sWZbsX_0py-in06ZQrG1oJALPlQxtTWSBhV5bhz3sg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/Mjc0NzExMC9waG90/by9xdWl6LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz00X25w/UFZJYnZpSkh3cGQ0/MkNUVU5zZE55bU5i/R3Rnc0NUWldfYzN6/bGRjPQ" 
                alt="Quiz Masters 1" 
              />
              <h3>Quiz Masters 1</h3>
              <p>Dive deeper</p>
            </div>
            <button 
              className="play-button" 
              onClick={() => handleClick('game1', '/quiz')}
              disabled={buttonStates.game1.isDisabled}
              style={{ cursor: buttonStates.game1.isDisabled ? 'not-allowed' : 'pointer' }}
            >
              Play
            </button>
            {buttonStates.game1.isDisabled && (
              <div className="timer-box" style={{ 
                width: '150px', 
                backgroundColor: '#000', 
                color: '#fff', 
                padding: '10px', 
                borderRadius: '8px', 
                textAlign: 'center',
                margin: '10px auto'
              }}>
                <p>{formatTime(buttonStates.game1.timeRemaining)} remaining</p>
              </div>
            )}
          </div>

          <div className="play-container">
            <div className="play-box">
              <img 
                src="https://imgs.search.brave.com/FTIXEQX-28-wJqqzg-9vqstUqtIssGo7aOAwOAPGX3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGNnYW1lc24uY29t/L3dwLWNvbnRlbnQv/c2l0ZXMvcGNnYW1l/c24vMjAyNC8wNC9h/bmltYWwtd2VsbC1y/ZXZpZXctcGxhdGZv/cm0tZ2FtZS01NTB4/MzA5LmpwZw" 
                alt="Storymode Game" 
              />
              <h3>Storymode Game</h3>
              <p>Under Maintenance</p>
            </div>
            <button 
              className="play-button" 
              onClick={() => handleClick('game2', '/storymode')}
              disabled={buttonStates.game2.isDisabled}
              style={{ cursor: buttonStates.game2.isDisabled ? 'not-allowed' : 'pointer' }}
            >
              Play
            </button>
            {buttonStates.game2.isDisabled && (
              <div className="timer-box" style={{ 
                width: '150px', 
                backgroundColor: '#000', 
                color: '#fff', 
                padding: '10px', 
                borderRadius: '8px', 
                textAlign: 'center',
                margin: '10px auto'
              }}>
                <p>{formatTime(buttonStates.game2.timeRemaining)} remaining</p>
              </div>
            )}
          </div>

          <div className="play-container">
            <div className="play-box">
              <img 
                src="https://imgs.search.brave.com/a4ajJeSOWHHFm-D3v8ZmZ6YwcQbKqlo41164IQYYnqs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3JhenlnYW1l/cy5jb20vZ2FtZXMv/Y3Jvc3N3b3JkL2Nv/dmVyLTE2MTkyNzg0/NTM2MjAucG5nP2F1/dG89Zm9ybWF0LGNv/bXByZXNzJnE9NjUm/Y3M9c3RyaXAmY2g9/RFBSJmZpdD1jcm9w" 
                alt="Crossword Puzzle" 
              />
              <h3>Crossword Puzzle</h3>
              <p>Under Maintenance</p>
            </div>
            <button 
              className="play-button" 
              onClick={() => handleClick('game3', '/crossword')}
              disabled={buttonStates.game3.isDisabled}
              style={{ cursor: buttonStates.game3.isDisabled ? 'not-allowed' : 'pointer' }}
            >
              Play
            </button>
            {buttonStates.game3.isDisabled && (
              <div className="timer-box" style={{ 
                width: '150px', 
                backgroundColor: '#000', 
                color: '#fff', 
                padding: '10px', 
                borderRadius: '8px', 
                textAlign: 'center',
                margin: '10px auto'
              }}>
                <p>{formatTime(buttonStates.game3.timeRemaining)} remaining</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Letsplay;