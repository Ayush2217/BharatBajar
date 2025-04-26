import React from 'react';

const PersonalizedSection = ({ personalizedItems = [] }) => {
    return (
        <div className="personalized-section">
            <h2>Personalized for You</h2>
            <div className="personalized-list">
                {personalizedItems?.map((item, index) => (
                    <div key={index} className="personalized-item">
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>Price: ₹{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalizedSection;
