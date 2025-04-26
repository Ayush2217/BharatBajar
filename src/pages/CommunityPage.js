// CommunityPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewDiscussionPopup from './Community_Discussion_Pages/NewDiscussionPopup'; // Import the modal component
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [showNewDiscussionPopup, setShowNewDiscussionPopup] = useState(false);

  // Function to handle opening the new discussion modal
  const handleNewDiscussion = () => {
    setShowNewDiscussionPopup(true); // Show the popup modal
  };

  // Function to handle creating a discussion
  const handleCreateDiscussion = (discussion) => {
    setShowNewDiscussionPopup(false); // Close the popup modal
    navigate(`/discussion/${discussion.title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="community-page">
      {/* Header Section */}
      <section className="community-header">
        <h1>Join the Movement to Revive Indian Retail</h1>
        <p>Share local stories, discover hidden gems, and connect with those powering Bharat’s retail revolution.</p>
        <button className="cta-button" onClick={() => navigate('/explore')}>
          Back To Exploring RM
        </button>

        {/* Navigation Button to Community Videos Page */}
        <button
          className="cta-button"
          onClick={() => navigate('/community-videos')}
          style={{ margin: '20px 0' }}
        >
          Go to Community Videos
        </button>
      </section>

      {/* Trending in the Community Section */}
      <section className="community-content-grid">
        <h2>Trending in the Community</h2>
        <div className="content-grid">
          <div className="content-tile">
            <h3>Stores Review</h3>
            <p>User: TechGuru</p>
          </div>
          <div className="content-tile">
            <h3>Review: iPhone 16 pro max</h3>
            <p>User: Ritesh</p>
          </div>
          <div className="content-tile">
            <h3>How to Fix your Balcony hangers</h3>
            <p>User: FixItPro</p>
          </div>
        </div>
      </section>

      {/* Discussion Forum Section */}
      <section className="discussion-forum">
        <h2>Join the Conversation</h2>
        <p>Ask questions, share advice, and connect with others.</p>
        <div className="forum-grid">
          <div className="forum-post">
            <h4>Best Shops for Electronic items</h4>
            <p>Posted by: GadgetLover</p>
          </div>
          <div className="forum-post">
            <h4>Need help with a Authentic Art and Gallary shop near me</h4>
            <p>Posted by: Ritesh</p>
          </div>
        </div>
        <button className="cta-button" onClick={() => navigate('/discussion')}>
          Join a Discussion
        </button>

        {/* New "Initiate a New Discussion" button */}
        <button
          className="cta-button"
          onClick={handleNewDiscussion}
          style={{ marginTop: '10px' }}
        >
          Initiate a New Discussion
        </button>
      </section>

      {/* New Discussion Popup Modal */}
      {showNewDiscussionPopup && (
        <NewDiscussionPopup
          onClose={() => setShowNewDiscussionPopup(false)}
          onCreateDiscussion={handleCreateDiscussion}
        />
      )}
    </div>
  );
};

export default CommunityPage;
