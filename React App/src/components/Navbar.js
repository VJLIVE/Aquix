import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0); // State to hold user points
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    // Check for authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserPoints(user.uid); // Fetch points when user is logged in
      } else {
        setUser(null);
        setPoints(0); // Reset points when user is logged out
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchUserPoints = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId); // Replace 'users' with your Firestore collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPoints(docSnap.data().points || 0); // Replace 'points' with the actual field name
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/"); // Redirect to home page after sign out
      console.log("Signed out successfully");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
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
            }}
          >
            AQUIX
          </h1>
        </Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="#">Let's Play</Link></li>
        <li><Link to="#">Leaderboard</Link></li>
        <li><Link to="/connect">Connect With Us</Link></li>
        <li><Link to="#">Support</Link></li>
      </ul>
      <div className="right-icons">
        {user ? (
          <>
            <Link to="/profile" className="login-btn">Profile</Link>
            <div className="points-box" style={{marginBottom: '10px', boxShadow: '0 0 20px rgba(0, 170, 255, 0.7)'}}>
              <p>{points} Points</p>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="login-btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;