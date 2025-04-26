import React from 'react';
import '../../styles/ButtonGroup.css';

const ButtonGroup = ({ buttons, onClick }) => {
    return (
        <div className="button-group">
            {buttons.map((button, index) => (
                <button key={index} className="button-group__button" onClick={() => onClick(button)}>
                    {button}
                </button>
            ))}
        </div>
    );
};

export default ButtonGroup;
