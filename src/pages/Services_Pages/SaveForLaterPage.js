import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const SaveForLaterPage = () => {
    const { addToCart } = useCart();
    const [saveForLaterItems, setSaveForLaterItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch save for later items from local storage
        const savedItems = localStorage.getItem("saveForLater");
        if (savedItems) {
            setSaveForLaterItems(JSON.parse(savedItems));
        }
    }, []);

    const moveToCart = (item) => {
        addToCart({ ...item, quantity: 1 }); // Move the item back to the cart
        const updatedList = saveForLaterItems.filter((product) => product.id !== item.id);
        setSaveForLaterItems(updatedList);
        localStorage.setItem("saveForLater", JSON.stringify(updatedList));
    };

    const handleProductClick = (productName) => {
        navigate(`/product-details/${encodeURIComponent(productName)}`);
    };

    return (
        <div>
            <h1>Saved for Later</h1>
            {saveForLaterItems.length === 0 ? (
                <p>No items saved for later.</p>
            ) : (
                saveForLaterItems.map((item) => (
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
                                    moveToCart(item);
                                }}
                            >
                                Move to Cart
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SaveForLaterPage;
