import React from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa'; // Importing send and media picker icons
import '../../../styles/InputSection.css';

const InputSection = ({ placeholder, question, setQuestion, handleAskQuestion }) => {

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAskQuestion();
        }
    };

    return (
        <div className="unified-input-container">
            <FaPaperclip className="media-picker-icon" />
            <input
                type="text"
                placeholder={placeholder}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress} // Listen for Enter key press
                className="input-field"
            />
            <FaPaperPlane onClick={handleAskQuestion} className="send-icon" />
        </div>
    );
};

export default InputSection;
