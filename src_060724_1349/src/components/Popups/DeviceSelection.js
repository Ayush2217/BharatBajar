import React from 'react'; // Assuming you are using JSX in the file

const DeviceSelection = ({ isOpen, mobilePhones, selectedPhones, getImagePath, handleCheckboxChange, closePopup, proceedToNext }) => {
    console.log("Is Open:", isOpen);
	console.log("Mobile Phones:", mobilePhones);
    return (
        <div className={`mobile-popup ${isOpen ? 'active' : ''}`}>
            <div className="mobile-popup-header">
                <h2>Select Your Mobile Phone</h2>
                <button className="close-button" onClick={closePopup}>
                    &times;
                </button>
            </div>
            <div className="mobile-popup-body">
                <ul>
                    {mobilePhones.map((phone, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(phone.name)}
                                    checked={selectedPhones.includes(phone.name)}
                                />
                                <img src={getImagePath(phone.image)} alt={phone.name} className="image-size" />
                                {phone.name}
                            </label>
                        </li>
                    ))}
                </ul>
                {selectedPhones.length > 0 && (
                    <button className="proceed-button" onClick={proceedToNext}>
                        Proceed
                    </button>
                )}
            </div>
        </div>
    );
}

export default DeviceSelection;
