import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [notification, setNotification] = useState(''); // State for notifications
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserPoints(user.uid);
        handleLogin(user.uid); // Check for login-related point updates
      } else {
        setUser(null);
        setPoints(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserPoints = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPoints(docSnap.data().points || 0);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
    }
  };

  const handleLogin = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lastLogin = data.lastLogin.toDate();
        const currentTime = new Date();
        const timeDifference = currentTime - lastLogin;
        
        let newPoints = data.points || 0;
        let message = '';

        // Add 20 points for new account creation
        if (data.lastLogin === undefined) {
          newPoints += 20;
          message = "You got 20 Hails for creating an account in AQUIX";
        } 
        // Add 10 points if 30 minutes have passed since last login
        else if (timeDifference >= 10 * 60 * 1000) {
          newPoints += 10;
          message = "You got 10 Hails for playing for 20 minutes";
        }
        // Add 5 points for daily login
        else if (isDifferentDay(lastLogin, currentTime)) {
          newPoints += 5;
          message = "You got 5 Hails for daily login";
        }

        if (message) {
          await updateDoc(docRef, {
            points: newPoints,
            lastLogin: currentTime
          });
          setPoints(newPoints);
          showNotification(message); // Trigger notification
        }
      }
    } catch (error) {
      console.error("Error updating user points:", error);
    }
  };

  const isDifferentDay = (date1, date2) => {
    return date1.getDate() !== date2.getDate() ||
           date1.getMonth() !== date2.getMonth() ||
           date1.getFullYear() !== date2.getFullYear();
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000); // Notification will be shown for 5 seconds
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              marginLeft: '10px',
              fontSize: '30px',
              textShadow: '0 0 20px #00aaff',
              color: 'white',
              marginTop: '20px',
            }}
          >
            AQUIX
          </h1>
        </Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/letsplay">Let's Play</Link></li>
        <li><Link to="#">Leaderboard</Link></li>
        <li><Link to="/connect">Connect With Us</Link></li>
        <li><Link to="#">Support</Link></li>
      </ul>
      <div className="right-icons">
        {user ? (
          <>
            <Link to="/profile" className="login-btn">Profile</Link>
            <div className="points-box" style={{marginBottom: '10px', boxShadow: '0 0 20px rgba(0, 170, 255, 0.7)'}}>
              <p>{points} Hails</p>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="login-btn">Signup</Link>
          </>
        )}
      </div>
      {notification && (
        <div className="notification" style={{position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'rgba(0, 170, 255, 0.8)', color: 'white', padding: '10px', borderRadius: '5px'}}>
          {notification}
        </div>
      )}
    </nav>
  );
};

export default Navbar;