// src/components/Popups/TechnicianSlotPopup.js
import React from 'react';

const TechnicianSlotPopup = ({ isOpen, technicianSlots, selectedSlots, handleSlotCheckboxChange, closePopup, proceedToNext }) => {
  return (
    <div className={`mobile-popup ${isOpen ? 'active' : ''}`}>
      <div className="mobile-popup-header">
        <h2>Select Technician Slot</h2>
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>
      </div>
      <div className="mobile-popup-body">
        <p>Select an available slot for the technician to visit:</p>
        <ul>
          {technicianSlots.map((slot, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleSlotCheckboxChange(slot)}
                  checked={selectedSlots.includes(slot)}
                />
                {slot.date} - {slot.time}
              </label>
            </li>
          ))}
        </ul>
        {selectedSlots.length > 0 && (
          <button className="proceed-button" onClick={proceedToNext}>
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default TechnicianSlotPopup;
