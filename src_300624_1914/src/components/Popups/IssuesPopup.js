// src/components/Popups/IssuesPopup.js
import React from 'react';

const IssuesPopup = ({ isOpen, issues, selectedIssues, handleCheckboxChange, handleIssueCheckboxChange, closePopup, proceedToNext, showOtherInput, setOtherIssue, otherIssue }) => {
  return (
    <div className={`mobile-popup ${isOpen ? 'active' : ''}`}>
      <div className="mobile-popup-header">
        <h2>Select Issues</h2>
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>
      </div>
      <div className="mobile-popup-body">
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`issue-${index}`}
                onChange={() => handleIssueCheckboxChange(issue)}
                checked={selectedIssues.includes(issue)}
              />
              <label htmlFor={`issue-${index}`}>{issue}</label>
            </li>
          ))}
          <li>
            <input
              type="checkbox"
              id="issue-others"
              onChange={() => handleIssueCheckboxChange('Others')}
              checked={selectedIssues.includes('Others')}
            />
            <label htmlFor="issue-others">Others</label>
            {showOtherInput && (
              <input
                type="text"
                value={otherIssue}
                onChange={(e) => setOtherIssue(e.target.value)}
                placeholder="Please describe your issue"
                className="other-input"
              />
            )}
          </li>
        </ul>
        <button className="proceed-button" onClick={proceedToNext}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default IssuesPopup;
