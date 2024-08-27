import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        setError('Invalid email or password. Please try again.');
        console.log(error.code, error.message);
      });
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <div className="auth-container">
        <div className="container" id="signIn">
          <h1 className="form-title">Sign In</h1>
          {error && <div id="signInMessage" className="messageDiv">{error}</div>}
          <form onSubmit={onLogin}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="recover"><a href="#">Forgot Password?</a></p>
            <button type="submit" className="btn" id="submitSignIn">Sign In</button>
          </form>
          <p className="or">or</p>
          <div className="icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-facebook"></i>
          </div>
          <div className="links">
            <p>Don't have an account?</p>
            <NavLink to="/signup" id="signUpButton">Sign Up</NavLink>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default Login;