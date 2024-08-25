// src/pages/Login.jsx
import React, { useState } from 'react';
import '../styles/Login.css';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { auth, signInWithEmailAndPassword } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <>
            <Navbar />
            <div className="background">
                <form onSubmit={handleLogin}>
                    <h3>Login Here</h3>

                    {error && <p className="error">{error}</p>}

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Email or Phone"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Log In</button>

                    <div className="social">
                        <a href="#" className="go"><i className="fab fa-google"></i>  Google</a>
                        <a href="#" className="fb"><i className="fab fa-facebook"></i>  Facebook</a>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;