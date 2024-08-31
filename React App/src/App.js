import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import Profile from './components/Profile';
import Connect from './components/connectwithus';
import Letsplay from './components/letsplay';
import QuizMasters from './components/Quiz';
import QuizResults from './components/QuizResult';
import Certificate from './components/Certificate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/letsplay" element={<Letsplay/>}/>
                <Route path="/Quiz" element={<QuizMasters/>}/>
                <Route path="/quizresults" element={<QuizResults />} />
                <Route path="/Certificate" element={<Certificate />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;