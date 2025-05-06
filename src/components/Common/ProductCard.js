import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import '../../styles/ProductCard.css';

const ProductCard = ({ productName, productImage, productPrice, productStore, productData, onClick }) => {
    const navigate = useNavigate();
    const { addToCart, buyNow } = useCart();
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(productData);
        navigate('/cart');
        setTimeout(() => setDialogVisible(false), 2000);
    };

    return (
        <div 
            className="product-card" 
            onClick={() => {
                if (onClick) {
                    console.log(`Card clicked for: ${productName}`);
                    onClick();
                }
            }}
            style={{ cursor: "pointer" }}
        >
            <div className="product-image-wrapper">
                <img 
                    src={productImage || 'https://via.placeholder.com/300'} 
                    alt={productName} 
                    className="product-image" 
                />
            </div>

            <div className="product-info">
                <u className="product-store">{"Store: " + productStore}</u>
                <h4 className="product-name">{productName}</h4>
                <p className="product-price">₹{productPrice.toLocaleString()}</p>
                <div className="button-container">
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        className="buy-now-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            buyNow(productData);
                            navigate('/checkout');
                        }}
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {dialogVisible && (
                <div className="dialog-box">
                    <p>{productName} has been added to your cart!</p>
                </div>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    productName: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productData: PropTypes.object.isRequired,
};

export default ProductCard;
