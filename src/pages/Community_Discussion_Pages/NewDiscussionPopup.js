// NewDiscussionPopup.js
import React, { useState } from 'react';
import '../../styles/NewDiscussionPopup.css';

const NewDiscussionPopup = ({ onClose, onCreateDiscussion }) => {
  const [title, setTitle] = useState('');
  const [accessType, setAccessType] = useState('Anyone can join');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onCreateDiscussion({ title, accessType });
      onClose();
    } else {
      alert("Please enter a discussion title.");
    }
  };

  return (
    <div className="new-discussion-popup">
      <div className="popup-content">
        <h2>Initiate New Discussion</h2>
        <form onSubmit={handleSubmit}>
          <label>Discussion Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter discussion title"
            required
          />
          
          <label>Who can join?</label>
          <select value={accessType} onChange={(e) => setAccessType(e.target.value)}>
            <option>Anyone can join</option>
            <option>Invite-only</option>
          </select>
          
          <button type="submit" className="create-button">Create Discussion</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewDiscussionPopup;
