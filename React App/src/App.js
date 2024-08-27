import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import Profile from './components/Profile';
import Connect from './components/connectwithus';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connect" element={<Connect />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;