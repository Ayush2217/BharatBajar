import React from 'react';

const DealsSection = ({ dealsItems = [] }) => {
    return (
        <div className="deals-section">
            <h2>Deals and Discounts</h2>
            <div className="deals-list">
                {dealsItems?.map((deal, index) => (
                    <div key={index} className="deal-item">
                        <img src={deal.image} alt={deal.title} />
                        <h3>{deal.title}</h3>
                        <p>Price: ₹{deal.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealsSection;
