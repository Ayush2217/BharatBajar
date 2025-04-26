import React from "react";

const RelatedProducts = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div>
            <h2>Related Products</h2>
            <ul>
                {data.map((product, index) => (
                    <li key={index}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedProducts;
