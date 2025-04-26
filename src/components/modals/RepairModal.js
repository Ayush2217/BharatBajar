// src/components/modals/RepairModal.js
import React from 'react';
import '../../styles/RepairModal.css'; // Ensure this CSS file exists and styles the modal appropriately

const RepairModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    console.log('RepairModal mounted');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Repair Services</h2>
                <ul>
                    <li>
                        <h3>Screen Replacement</h3>
                        <p>We replace cracked or broken screens for all device models.</p>
                    </li>
                    <li>
                        <h3>Battery Replacement</h3>
                        <p>Extend your device's life with our professional battery replacement services.</p>
                    </li>
                    <li>
                        <h3>Water Damage Repair</h3>
                        <p>We can fix devices that have been damaged by water or other liquids.</p>
                    </li>
                    <li>
                        <h3>Software Troubleshooting</h3>
                        <p>Resolve software issues and improve device performance.</p>
                    </li>
                    {/* Add more services as needed */}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default RepairModal;
