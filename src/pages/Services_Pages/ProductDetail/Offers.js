import React from "react";

const Offers = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div>
            <h2>Offers</h2>
            <ul>
                {data.map((offer, index) => (
                    <li key={index}>{offer}</li>
                ))}
            </ul>
        </div>
    );
};

export default Offers;
