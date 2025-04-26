import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ProductTile.css';

const ProductTile = ({ image, name, price, onAddToCart, onBuyNow, isFeatured }) => {
    return (
        <div className={`product-tile ${isFeatured ? 'featured' : ''}`}>
            <img src={image} alt={name} className="product-tile__image" />
            <h4 className="product-tile__name">{name}</h4>
            <p className="product-tile__price">${price}</p>
            <div className="product-tile__actions">
                <button className="product-tile__button" onClick={onAddToCart}>Add to Cart</button>
                <button className="product-tile__button product-tile__button--buy" onClick={onBuyNow}>Buy Now</button>
            </div>
        </div>
    );
};

ProductTile.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onBuyNow: PropTypes.func.isRequired,
    isFeatured: PropTypes.bool // Optional prop to feature specific products
};

export default ProductTile;
