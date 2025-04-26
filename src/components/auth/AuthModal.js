import React, { forwardRef, useState, useEffect } from 'react';
import '../../styles/AuthModal.css';
import googleLogo from '../../assets/google.jpg';
import microsoftLogo from '../../assets/microsoft.png';
import appleLogo from '../../assets/apple.png';
import axios from 'axios';

const AuthModal = forwardRef(({ isOpen, onClose, setIsLoggedIn, setUsername }, ref) => {
    const [isLogin, setIsLogin] = useState(true);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsernameState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Add a class to the body to prevent scrolling and manage padding to prevent shifting
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            // Remove the class and reset styles
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            // Clean up when component unmounts or when modal closes
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    const handleIdentifierChange = (e) => {
        setIdentifier(e.target.value.trim());
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
    };

    const validateIdentifier = (identifier) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9 ]+$/;
        return emailRegex.test(identifier) || usernameRegex.test(identifier);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        let valid = true;

        if (!validateIdentifier(identifier)) {
            setEmailError('Please enter a valid email address or username.');
            valid = false;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include letters, numbers, and special characters.');
            valid = false;
        }

        if (valid) {
            if (isLogin) {
                axios.post('http://127.0.0.1:8000/users/login/', { identifier, password })
                    .then(response => {
                        console.log('Login successful', response.data);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', response.data.username);
                        setIsLoggedIn(true);
                        setUsername(response.data.username);
                        onClose(); // Close the modal on successful login
                    })
                    .catch(error => {
                        console.error('Login failed:', error);
                        setEmailError('Invalid credentials. Please try again.');
                    });
            } else {
                axios.post('http://127.0.0.1:8000/users/signup/', { username, email: identifier, password, phone_number: phoneNumber })
                    .then(response => {
                        console.log('Signup successful', response.data);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', response.data.username);
                        setIsLoggedIn(true);
                        setUsername(response.data.username);
                        onClose(); // Close the modal on successful signup
                    })
                    .catch(error => {
                        console.error('Signup failed:', error);
                        setEmailError('Signup failed. Please try again.');
                    });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={ref} className="auth-modal modal open">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit} className={isLogin ? 'login-form' : 'signup-form'}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="username">Username*</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsernameState(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Phone Number (optional)"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="identifier">Email Address or Username*</label>
                        <input
                            type="text"
                            id="identifier"
                            placeholder="Email Address or Username"
                            value={identifier}
                            onChange={handleIdentifierChange}
                            required
                        />
                        {emailError && <div className="error">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {passwordError && <div className="error">{passwordError}</div>}
                    </div>
                    <button type="submit" className="continue-button">{isLogin ? 'Log In' : 'Sign Up'}</button>
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                        {isLogin ? 'Need to create an account?' : 'Already have an account? Log in'}
                    </button>
                    <div className="or-divider"><span>OR</span></div>
                    <button type="button" className="social-button google-button">
                        <img src={googleLogo} alt="Google logo" className="social-logo" /> Continue with Google
                    </button>
                    <button type="button" className="social-button microsoft-button">
                        <img src={microsoftLogo} alt="Microsoft logo" className="social-logo" /> Continue with Microsoft Account
                    </button>
                    <button type="button" className="social-button apple-button">
                        <img src={appleLogo} alt="Apple logo" className="social-logo" /> Continue with Apple
                    </button>
                </form>
            </div>
        </div>
    );
});

export default AuthModal;
