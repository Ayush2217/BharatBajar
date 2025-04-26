import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/GPT_Header.css';

const Header = ({ pageTitle, showExploreLinks }) => {
    return (
        <header className="gpt-header">
            <div className="gpt-nav-left">
                <Link to="/" className="gpt-button">Back to Main Page</Link>
                <Link to="/gpt" className="gpt-button">Start A New Chat</Link>
                <button className="gpt-button">See Previous Chats</button>
            </div>
            <h2 className="page-title">{pageTitle}</h2>
            {showExploreLinks && (
                <div className="gpt-nav-right">
                    <Link to="/explore" className="gpt-button">Explore Devices</Link>
                    <Link to="/community" className="gpt-button">Community Page</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
