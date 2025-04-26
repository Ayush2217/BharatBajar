import React from "react";
import ProductCard from "../../../components/Common/ProductCard";

const Overview = ({ data, onAddToCart, onBuyNow }) => {
    return (
        <div>
            <ProductCard
                productName={data.name}
                productImage={data.image || "https://via.placeholder.com/300"}
                productPrice={data.price}
				productStore={data.store}
                productData={data} // Pass the entire product data
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
            />
        </div>
    );
};

export default Overview;
