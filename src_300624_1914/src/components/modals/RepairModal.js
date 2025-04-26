import React from 'react';
import '../../styles/RepairModal.css'; // Make sure to create a corresponding CSS file for styling

const RepairModal = ({ isOpen, onClose }) => {
    console.log('RepairModal isOpen:', isOpen);
    if (!isOpen) {
        console.log('Repair modal is closed');
        return null;
    }

    return (
        <div className="repair-modal-backdrop">
            <div className="repair-modal">
                <h2>Device Mantra Repair Process</h2>
                <p><strong>AI-Driven Diagnostics:</strong> Encounter a problem? Our advanced AI algorithms provide instant, precise diagnostics remotely...</p>
                <p><strong>Professional Repairs:</strong> Benefit from our elite network of certified technicians...</p>
                <p><strong>Temporary Device Loans:</strong> Stay connected even when your device is under repair...</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default RepairModal;
