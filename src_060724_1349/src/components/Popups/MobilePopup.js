// src/components/Popups/MobilePopup.js
import React from 'react';
const MobilePopup = ({ isOpen, mobilePhones, closePopup, getImagePath }) => {
	console.log("Is Open:", isOpen);
	console.log("Mobile Phones:", mobilePhones);
  return (
    <div className={`mobile-popup ${isOpen ? 'active' : ''}`}>
      <div className="mobile-popup-header">
        <h2>Available Mobile Phones</h2>
        <button className="close-button" onClick={closePopup}>&times;</button>
      </div>
      <div className="mobile-popup-body">
        <ul>
          {mobilePhones.map((phone, index) => (
            <li key={index}>
              <img src={getImagePath(phone.image)} alt={phone.name} className="image-size" />
              {phone.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobilePopup;
