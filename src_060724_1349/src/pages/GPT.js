import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GptChatPage.css';

const GPT = () => {
    return (
        <div className="gpt-chat-page">
            <header className="gpt-header">
                <div className="gpt-logo">
                    <img src="/path/to/logo.png" alt="Logo" />
                </div>
                <div className="gpt-nav">
                    <Link to="/" className="gpt-button">Back to Main Page</Link>
                    <Link to="/gptchat" className="gpt-button">Start A New Chat</Link>
                    <button className="gpt-button">See Previous Chats</button>
                </div>
            </header>
            <div className="gpt-chat-container">
                <div className="gpt-sidebar">
                    <div className="gpt-section">
                        <h3>Explore</h3>
                        <ul>
                            <li><Link to="/gptchat">Sales</Link></li>
                            <li>Diagnostics</li>
                            <li>Warranties</li>
                            <li>Training</li>
                            <li>Learning</li>
                            <li>Refurbishment</li>
                        </ul>
                    </div>
                </div>
                <div className="gpt-main-chat">
                    <div className="gpt-chat-header">
                        <h2>General</h2>
                    </div>
                    <div className="gpt-chat-box">
                        <div className="gpt-messages">
                            <div className="gpt-message">E-GPT Reply</div>
                        </div>
                        <div className="gpt-input-container">
                            <input type="text" placeholder="Message E-GPT" />
                            <button className="gpt-send-button">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GPT;
