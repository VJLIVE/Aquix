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
                    setUserData(docSnap.data());
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
            <Footer />
        </>
    );
};

export default Profile;