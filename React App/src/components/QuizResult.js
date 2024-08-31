import React, { useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import Navbar from './Navbar';
import Footer from './Footer';

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const db = getFirestore();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  const [pointsUpdated, setPointsUpdated] = useState(false);

  // Calculate points earned or lost in the current quiz
  const pointsEarned = useCallback(() => {
    const correctPoints = score * 5;
    const incorrectPoints = totalQuestions - score;
    const netPoints = correctPoints - incorrectPoints;
    console.log(`Points Earned: ${netPoints}`);
    return netPoints;
  }, [score, totalQuestions]);

  // Function to update points in the user's account
  const updatePoints = useCallback(async () => {
    if (auth.currentUser && !pointsUpdated) {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, 'users', userId);
      const earnedPoints = pointsEarned();

      try {
        // Fetch current points
        const userDoc = await getDoc(docRef);
        const currentPoints = userDoc.exists() ? userDoc.data().points || 0 : 0;

        // Calculate new points total
        const newPoints = currentPoints + earnedPoints;

        // Update the points in the Firestore document
        await updateDoc(docRef, { points: newPoints });

        console.log(`Successfully updated points. Previous: ${currentPoints}, Earned: ${earnedPoints}, New Total: ${newPoints}`);
        setPointsUpdated(true);
      } catch (error) {
        console.error("Error updating points:", error);
      }
    }
  }, [pointsEarned, db, pointsUpdated]);

  useEffect(() => {
    updatePoints();
  }, [updatePoints]);

  const handleTryAgain = () => {
    navigate('/letsplay');
  };

  return (
    <>
      <Navbar />
      <div className="results-container">
        <div className="show-score">
          Your Score: {score}<br/>
          Total Questions: {totalQuestions}<br/>
          Points Earned: {pointsEarned()}
        </div>
        <button id="try-again-button" onClick={handleTryAgain}>Better Luck Next Time</button>
      </div>
      <Footer />
    </>
  );
}

export default QuizResult;