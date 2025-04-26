import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const WishlistPage = () => {
    const { addToCart } = useCart();
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    // Fetch wishlist items from localStorage on component mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
    }, []);

    const moveToCart = (item) => {
        addToCart({ ...item, quantity: 1 }); // Add item to cart
        const updatedWishlist = wishlistItems.filter((product) => product.id !== item.id);
        setWishlistItems(updatedWishlist); // Update local state
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Sync with localStorage
    };

    const removeFromWishlist = (item) => {
        const updatedWishlist = wishlistItems.filter((product) => product.id !== item.id);
        setWishlistItems(updatedWishlist); // Update local state
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Sync with localStorage
    };

    const handleProductClick = (productName) => {
        navigate(`/product-details/${encodeURIComponent(productName)}`);
    };

    return (
        <div>
            <h1>Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div>
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                marginBottom: "10px",
                                cursor: "pointer",
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                            onClick={() => handleProductClick(item.name)}
                        >
                            <img
                                src={item.image || "https://via.placeholder.com/150"}
                                alt={item.name}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price.toLocaleString()}</p>
                                <div>
                                    <button
                                        style={{
                                            marginTop: "10px",
                                            backgroundColor: "#28a745",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                            marginRight: "5px",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent click event
                                            moveToCart(item);
                                        }}
                                    >
                                        Move to Cart
                                    </button>
                                    <button
                                        style={{
                                            marginTop: "10px",
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent click event
                                            removeFromWishlist(item);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
