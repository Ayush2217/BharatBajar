import React from 'react';
import '../../../styles/CommonOutput.css';

const CommonOutput = ({ answer }) => {
    return (
        <div className="output-section">
            {answer ? (
                <div className="output-content">
                    <p>{answer}</p>
                </div>
            ) : (
                <div className="output-placeholder">
                    <p>No response yet. Ask something to get started!</p>
                </div>
            )}
        </div>
    );
};

export default CommonOutput;
