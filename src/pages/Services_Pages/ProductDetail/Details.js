import React from "react";

const Details = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div>
            <h2>Details</h2>
            <ul>
                {data.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    );
};

export default Details;
