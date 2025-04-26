// DiscussionPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/DiscussionPage.css';

const DiscussionPage = () => {
  const { title } = useParams(); // Extract title from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Placeholder to simulate messages loading from backend
  useEffect(() => {
    // Mock initial messages for demonstration purposes
    setMessages([
      { id: 1, text: 'This is the beginning of the discussion.', user: 'Moderator' }
    ]);
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        user: 'You'
      };
      setMessages([...messages, newMsg]); // Add new message to message list
      setNewMessage(''); // Clear the input
    }
  };

  return (
    <div className="discussion-page">
      <h1>{title.replace(/-/g, ' ')}</h1>
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.user === 'You' ? 'your-message' : 'other-message'}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DiscussionPage;
