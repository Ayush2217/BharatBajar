import React, { useState } from 'react';
import '../../styles/RepairDialog.css';

const RepairDialog = ({ onClose }) => {
  const [selectedIssues, setSelectedIssues] = useState([]);

  const commonIssues = [
    'Screen Damage',
    'Battery Issues',
    'Software Problems',
    'Camera Issues',
    'Sound Problems',
    'Connectivity Issues',
    'Other'
  ];

  const handleIssueChange = (issue) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  return (
    <div className="repair-dialog">
      <div className="repair-dialog-content">
        <h2>Select Issues for Repair</h2>
        <div className="issues-dropdown">
          {commonIssues.map((issue, index) => (
            <div key={index} className="issue-item">
              <input
                type="checkbox"
                id={issue}
                name={issue}
                value={issue}
                onChange={() => handleIssueChange(issue)}
              />
              <label htmlFor={issue}>{issue}</label>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RepairDialog;
