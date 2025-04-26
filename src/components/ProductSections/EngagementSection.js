import React from 'react';

const EngagementSection = ({ communityItems = [] }) => {
    return (
        <div className="engagement-section">
            <h2>Community Picks</h2>
            <div className="community-list">
                {communityItems?.map((item, index) => (
                    <div key={index} className="community-item">
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EngagementSection;
