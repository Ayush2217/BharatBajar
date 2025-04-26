import React from 'react';

const AccessoriesSection = ({ accessoriesItems = [] }) => {
    return (
        <div className="accessories-section">
            <h2>Accessories</h2>
            <div className="accessories-list">
                {accessoriesItems?.map((accessory, index) => (
                    <div key={index} className="accessory-item">
                        <img src={accessory.image} alt={accessory.title} />
                        <h3>{accessory.title}</h3>
                        <p>Price: ₹{accessory.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccessoriesSection;
