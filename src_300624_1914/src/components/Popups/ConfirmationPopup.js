// src/components/Popups/ConfirmationPopup.js
import React from 'react';

const ConfirmationPopup = ({ isOpen, selectedPhones, selectedIssues, selectedSlots, closePopup, confirmBooking, goBack, setIsConfirmationPopupActive, setIsTechnicianSlotPopupActive }) => {
  return (
    <div className={`mobile-popup ${isOpen ? 'active' : ''}`}>
      <div className="mobile-popup-header">
        <h2>Confirm Your Booking</h2>
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>
      </div>
      <div className="mobile-popup-body">
        <h3>Selected Mobile Phone:</h3>
        <ul>
          {selectedPhones.map((phone, index) => (
            <li key={index}>{phone}</li>
          ))}
        </ul>
        <h3>Selected Issues:</h3>
        <ul>
          {selectedIssues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
        <h3>Technician Slot:</h3>
        <ul>
          {selectedSlots.map((slot, index) => (
            <li key={index}>{slot.date} - {slot.time}</li>
          ))}
        </ul>
        <button className="proceed-button" onClick={confirmBooking}>
          Confirm Booking
        </button>
        <button className="back-button" onClick={() => {
          setIsConfirmationPopupActive(false);
          setIsTechnicianSlotPopupActive(true);
        }}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
