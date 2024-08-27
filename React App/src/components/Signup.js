import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Make sure to import 'db' from your Firebase configuration
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName,
        email: email,
        mobileNo: mobileNo,
        age: age,
        country: country,
        state: state,
      });

      console.log('User created and additional details stored:', user);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      console.log(error.code, error.message);
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <div className="auth-container">
        <div className="container" id="signUp">
          <h1 className="form-title">Sign Up</h1>
          {error && <div id="signUpMessage" className="messageDiv">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="input-name">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  id="mobileNo"
                  placeholder="Mobile No"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <i className="fas fa-birthday-cake"></i>
                <input
                  type="number"
                  id="age"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-flag"></i>
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  type="text"
                  id="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
            </div>
            <button type="submit" className="btn" id="submitSignUp">Sign Up</button>
            <p className="or">or sign up with</p>
            <div className="icons">
              <i className="fab fa-google"></i>
              <i className="fab fa-facebook"></i>
            </div>
          </form>
          <div className="links">
            <p>Already have an account?</p>
            <NavLink to="/login" id="signInButton">Sign In</NavLink>
          </div>
        </div>
      </div>

      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default Signup;