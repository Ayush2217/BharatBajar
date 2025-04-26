// CommunityVideosPage.js
import React, { useState } from 'react';
import '../../styles/CommunityVideoPageSidebar.css';

const CommunityVideosPageSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="toggle-icon">☰</span>
      </div>
      <ul className="menu-items">
        <li>Home</li>
        <li>Shorts</li>
        <li>History</li>
        <li>Liked Videos</li>
        <li>Trending</li>
        <li>Shopping</li>
        <li>Music</li>
        <li>Movies</li>
        <li>Live</li>
        <li>Gaming</li>
      </ul>
    </div>
  );
};

export default CommunityVideosPageSidebar;
