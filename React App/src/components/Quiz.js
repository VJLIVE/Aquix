import React, { useState } from 'react';
import { QuizData } from './QuizData';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css'; // Ensure you have a CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
      // Navigate with state to QuizResults
      navigate('/quizresults', { state: { score, totalQuestions: QuizData.length } });
    }
  };

  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <>
      <Navbar />
      <div>
      <iframe
          width="720"
          height="400"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block', margin: '0 auto', marginTop: '20px', borderRadius: '10px'}} // Center the iframe
        ></iframe>
        <p className="heading-txt">Quiz APP</p>
        <div className="quiz-container">
          {showResult ? (
            // No longer needed here since result handling is done in QuizResults
            null
          ) : (
            <>
              <div className="question">
                <span className="question-number">{currentQuestion + 1}. </span>
                <span className="question-txt">{QuizData[currentQuestion].question}</span>
              </div>
              <div className="option-container">
                {QuizData[currentQuestion].options.map((option, i) => (
                  <button
                    className={`option-btn ${clickedOption === i + 1 ? 'checked' : ''}`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                id="next-button"
                onClick={changeQuestion}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Quiz;