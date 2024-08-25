import React from 'react';
import '../styles/Signup.css'; // Make sure to create this file based on the provided style
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

const Signup = () => {
    return (
        <>
            <Navbar />
            <div className="background">
                <form>
                    <h3>Signup Here</h3>

                    <div className="row">
                        <div className="column">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" placeholder="First Name" id="firstName" />
                        </div>
                        <div className="column">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" placeholder="Last Name" id="lastName" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Email" id="email" />
                        </div>
                        <div className="column">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="tel" placeholder="Mobile Number" id="mobile" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <label htmlFor="country">Country</label>
                            <input type="text" placeholder="Country" id="country" />
                        </div>
                        <div className="column">
                            <label htmlFor="state">State</label>
                            <input type="text" placeholder="State" id="state" />
                        </div>
                    </div>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" />

                    <button type="submit">Sign Up</button>

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

export default Signup;
