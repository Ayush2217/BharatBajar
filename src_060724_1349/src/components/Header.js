import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css'; // Make sure this path is correct
import AuthModal from './auth/AuthModal';
import searchIcon from '../assets/Logo.png'; // Ensure this is the correct path to the logo

const Header = ({ onRepairClick, onLogout }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState({ services: false, research: false, contact: false, aboutUs: false });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const searchRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setIsLoggedIn(true);
            setUsername(username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        onLogout(); // Call the logout function passed as a prop
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        // Implement search functionality here
    };

    const toggleDropdown = (menu) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };

    const closeDropdowns = () => {
        setDropdownOpen({ services: false, research: false, contact: false, aboutUs: false });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
            closeDropdowns();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo-container" ref={searchRef}>
                <img src={searchIcon} alt="Search" className="search-icon" onClick={toggleSearch} />
                <div className="logo">{isLoggedIn ? `Welcome, ${username} to Device Mantra` : 'Device Mantra'}</div>
                {isSearchOpen && (
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />
                    </form>
                )}
            </div>
            <div className="nav-container">
                <nav className="nav">
                    <div className="nav-item" onMouseEnter={() => toggleDropdown('services')} onMouseLeave={closeDropdowns}>
                        <a href="#services">Services</a>
                        {dropdownOpen.services && (
                            <ul className="dropdown">
                                <li><a href="#repair" onClick={(e) => {
                                    e.preventDefault();
                                    console.log('Repair link clicked');
                                    onRepairClick(); // This function is passed from App.js
                                    closeDropdowns();
                                }}>Repair</a></li>
                                <li><a href="#services/diagnostics">Diagnostics</a></li>
                                <li><a href="#services/refurbishment">Refurbishment</a></li>
                            </ul>
                        )}
                    </div>
                    <div className="nav-item" onMouseEnter={() => toggleDropdown('research')} onMouseLeave={closeDropdowns}>
                        <a href="#research">Research</a>
                        {dropdownOpen.research && (
                            <ul className="dropdown">
                                <li><a href="#research/ai">AI</a></li>
                                <li><a href="#research/blockchain">Blockchain</a></li>
                                <li><a href="#research/sustainability">Sustainability</a></li>
                            </ul>
                        )}
                    </div>
                    <div className="nav-item" onMouseEnter={() => toggleDropdown('contact')} onMouseLeave={closeDropdowns}>
                        <a href="#contact">Contact</a>
                        {dropdownOpen.contact && (
                            <ul className="dropdown">
                                <li><a href="#contact/support">Support</a></li>
                                <li><a href="#contact/sales">Sales</a></li>
                                <li><a href="#contact/feedback">Feedback</a></li>
                            </ul>
                        )}
                    </div>
                    <div className="nav-item" onMouseEnter={() => toggleDropdown('aboutUs')} onMouseLeave={closeDropdowns}>
                        <a href="#about-us">About Us</a>
                        {dropdownOpen.aboutUs && (
                            <ul className="dropdown">
                                <li><a href="#about/team">Team</a></li>
                                <li><a href="#about/careers">Careers</a></li>
                                <li><a href="#about/mission">Mission</a></li>
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
            <div className="login-container">
                {isLoggedIn ? (
                    <button className="login-button" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="login-button" onClick={toggleModal}>Login</button>
                )}
            </div>
            <AuthModal isOpen={isModalOpen} onClose={toggleModal} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
        </header>
    );
};

export default Header;
