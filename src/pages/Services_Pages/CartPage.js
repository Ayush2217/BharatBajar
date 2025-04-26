import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CartPage = () => {
    const {
        cart,
        saveForLater,
        getTotalPrice,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        moveToSaveForLater,
        addToCart,
    } = useCart();
    const navigate = useNavigate();

    const handleBuyNow = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add some products to proceed.");
            return;
        }
        navigate("/checkout"); // Navigate to the Checkout Page
    };

    const handleProductClick = (productName) => {
        navigate(`/product-details/${encodeURIComponent(productName)}`);
    };

    return (
        <div>
            <h1>Your Cart</h1>

            {/* Cart Section */}
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div
                            key={item.id}
                            style={{ display: "flex", marginBottom: "10px", cursor: "pointer" }}
                            onClick={() => handleProductClick(item.name)}
                        >
                            <img
                                src={item.image || "https://via.placeholder.com/150"}
                                alt={item.name}
                                style={{ width: "150px", height: "150px", marginRight: "10px" }}
                            />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price.toLocaleString()}</p>
                                <div>
                                    {/* Quantity Increment/Decrement */}
                                    <button
                                        style={{
                                            padding: "5px 10px",
                                            margin: "0 5px",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            decrementQuantity(item.id);
                                        }}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        style={{
                                            padding: "5px 10px",
                                            margin: "0 5px",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            incrementQuantity(item.id);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Remove and Save for Later Buttons */}
                                <button
                                    style={{
                                        marginTop: "10px",
                                        backgroundColor: "#ffc107",
                                        color: "black",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(item.id);
                                    }}
                                >
                                    Remove
                                </button>
                                <button
                                    style={{
                                        marginTop: "10px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        moveToSaveForLater(item);
                                    }}
                                >
                                    Save for Later
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ₹{getTotalPrice().toLocaleString()}</h3>
                    <button
                        style={{
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={handleBuyNow}
                    >
                        Checkout
                    </button>
                </div>
            )}

            {/* Save for Later Section */}
            {saveForLater.length > 0 && (
                <div>
                    <h2>Saved for Later</h2>
                    {saveForLater.map((item, index) => (
                        <div
                            key={item.id}
                            style={{ display: "flex", marginBottom: "10px", cursor: "pointer" }}
                            onClick={() => handleProductClick(item.name)}
                        >
                            <img
                                src={item.image || "https://via.placeholder.com/150"}
                                alt={item.name}
                                style={{ width: "150px", height: "150px", marginRight: "10px" }}
                            />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price.toLocaleString()}</p>
                                <button
                                    style={{
                                        marginTop: "10px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(item);
                                    }}
                                >
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
