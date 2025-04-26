import React from "react";

const Reviews = ({ data }) => {
    if (!data) return null;

    return (
        <div>
            <h2>Customer Reviews</h2>
            <p><strong>Rating:</strong> {data.rating} / 5 ({data.count} reviews)</p>
            <ul>
                {data.highlights.map((review, index) => (
                    <li key={index}>{review}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;
