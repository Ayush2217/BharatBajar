import React, { useState } from 'react';
import '../../styles/GptChatPage.css';
import { Link } from 'react-router-dom';

const GptChatPage = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = () => {
        // Here, you would typically make an API call to get the answer from GPT
        // For this example, we'll just set a placeholder answer
        setAnswer('This is the answer from GPT.');
    };

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
                        <h2>Sales</h2>
                    </div>
                    <div className="gpt-device-comparison">
                        <div className="gpt-device">
                            <h3>Device X (type your device name)</h3>
                            <div className="gpt-device-details">
                                <div className="gpt-device-info">
                                    <p>Device</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Manufacturer</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Series</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Model</p>
                                </div>
                            </div>
                        </div>
                        <div className="gpt-add-more">
                            <p>Add More Devices to compare</p>
                        </div>
                        <div className="gpt-device">
                            <h3>Device X (type your device name)</h3>
                            <div className="gpt-device-details">
                                <div className="gpt-device-info">
                                    <p>Device</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Manufacturer</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Series</p>
                                </div>
                                <div className="gpt-device-info">
                                    <p>Model</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gpt-input-section">
                        <input
                            type="text"
                            placeholder="Ask E-GPT to help select your device"
                            value={question}
                            onChange={handleQuestionChange}
                            className="gpt-input"
                        />
                        <button onClick={handleAskQuestion} className="gpt-send-button">Send</button>
                    </div>
                    <div className="gpt-answer-section">
                        {answer && (
                            <div className="gpt-answer">
                                <p>{answer}</p>
                            </div>
                        )}
                    </div>
                    <div className="gpt-footer">
                        <p>Ask E-GPT to help select your device</p>
                    </div>
                </div>
                <div className="gpt-ads">
                    <p>ADS Similar To Main page</p>
                </div>
            </div>
        </div>
    );
};

export default GptChatPage;
