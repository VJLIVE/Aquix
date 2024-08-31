import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [points, setPoints] = useState(0); // Initialize points to 0
    const maxPoints = 200;
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                // Fetch user data from Firestore
                const userDoc = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setPoints(data.points || 0); // Fetch and set points
                } else {
                    console.log("No such document!");
                }
            } else {
                setUser(null);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/'); // Redirect to home page after sign out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleCertificateClick = () => {
        if (points >= maxPoints) {
          // Navigate to the certificate page
          alert("Congratulations for scoring 200 Hails! You can get your certificate now..!!");
          navigate('/Certificate');
        } else {
          alert("You need more points to get your certificate.");
        }
      };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="container" id="profile" style={{ marginLeft: '400px', marginTop: '20px', marginBottom: '20px'}}>
                    <h1 className="form-title">Your Profile</h1>
                    <div className="profile-details">
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" value={userData.firstName || ''} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" value={userData.email || ''} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-phone"></i>
                            <input type="text" value={userData.mobileNo || ''} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-birthday-cake"></i>
                            <input type="text" value={userData.age || ''} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-flag"></i>
                            <input type="text" value={userData.country || ''} readOnly />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-map-marker-alt"></i>
                            <input type="text" value={userData.state || ''} readOnly />
                        </div>
                        <button className="btn" id="editProfile">Edit Profile</button>
                    </div>

                    <h2 className="form-subtitle" style={{marginTop: '10px'}}>Account Management</h2>
                    <div className="account-management">
                        <button className="btn">Change Password</button>
                        <button className="btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <br></br>
            <hr></hr>
            <h1 style={{marginTop: '10px', fontSize: '50px'}}>GET CERTIFICATE</h1>
            <div className="points-box" style={{ 
                width: '150px', 
                backgroundColor: '#000', 
                color: '#fff', 
                padding: '10px', 
                borderRadius: '8px', 
                textAlign: 'center',
                margin: '20px auto'
            }}>
                <p>{points}/{maxPoints} Hails</p>
            </div>
            <button className="btn" onClick={handleCertificateClick} style={{
        backgroundColor: points >= maxPoints ? 'blue' : 'grey',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        cursor: points >= maxPoints ? 'pointer' : 'not-allowed',
        margin: '20px auto',
        display: 'block',
        width: '200px' // Reduced the width
        }}disabled={points < maxPoints}>Get Certificate</button>

        <p style={{marginBottom: '30px', textAlign: 'center'}}>Score 200 Hails and get your Certificate for joining Water Smart Youth..!!</p>
            <Footer />
        </>
    );
};

export default Profile;