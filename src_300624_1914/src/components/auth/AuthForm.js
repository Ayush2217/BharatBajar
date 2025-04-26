import React, { useState } from 'react';
import '../../styles/AuthForm.css'; // Ensure the CSS is properly linked
import axios from 'axios';

function AuthForm() {
    // Toggle state between login and signup
    const [isLogin, setIsLogin] = useState(true);
    const formClass = isLogin ? 'login-form' : 'signup-form';
    // State for user credentials
    const [identifier, setIdentifier] = useState(''); // Can be either email or username
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Only necessary for signup
    const [phoneNumber, setPhoneNumber] = useState(''); // Only necessary for signup and optional

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/users/login/', { identifier, password })
            .then(response => {
                console.log('Login successful', response.data);
                localStorage.setItem('token', response.data.token);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    const handleSignUp = () => {
        axios.post('http://127.0.0.1:8000/users/signup/', { username, email: identifier, password, phone_number: phoneNumber })
            .then(response => {
                console.log('Signup successful', response.data);
                localStorage.setItem('token', response.data.token);
            })
            .catch(error => {
                console.error('Signup failed:', error);
            });
    }

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        isLogin ? handleLogin() : handleSignUp();
    };

    // Function to toggle between Login and SignUp mode
    const toggleMode = () => {
        setIsLogin(!isLogin); // Toggle the state to switch modes
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'SignUp'}</h2>
            <form onSubmit={handleSubmit} className={formClass}>
                {!isLogin && (
                    <>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="identifier">Email Address or Username</label>
                    <input
                        type="text"
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">{isLogin ? 'Log In' : 'Sign Up'}</button>
            </form>
            <button onClick={toggleMode} className="toggle-button">
                {isLogin ? 'Need to create an account?' : 'Already have an account? Log in'}
            </button>
        </div>
    );
}

export default AuthForm;
