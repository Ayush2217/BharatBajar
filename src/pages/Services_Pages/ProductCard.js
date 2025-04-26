import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../contexts/CartContext";
import "../../styles/ProductCard.css";

const ProductCard = ({ productName, productImage, productPrice, productData }) => {
    const { addToCart, buyNow } = useCart();
    const [shoppingLists, setShoppingLists] = useState([]);
    const [selectedList, setSelectedList] = useState("");
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        // Fetch shopping lists from localStorage
        const savedLists = localStorage.getItem("shoppingLists");
        if (savedLists) {
            setShoppingLists(JSON.parse(savedLists));
        }
    }, []);

    const handleAddToList = () => {
        if (!selectedList) {
            alert("Please select or create a shopping list.");
            return;
        }

        const updatedLists = shoppingLists.map((list) =>
            list.name === selectedList
                ? { ...list, items: [...list.items, productData] }
                : list
        );
        setShoppingLists(updatedLists);
        localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
        alert(`${productName} has been added to "${selectedList}"!`);
    };

    const handleCreateNewList = () => {
        if (!newListName.trim()) {
            alert("List name cannot be empty.");
            return;
        }

        const newList = { name: newListName, items: [productData] };
        const updatedLists = [...shoppingLists, newList];
        setShoppingLists(updatedLists);
        localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
        setSelectedList(newListName);
        setNewListName("");
        alert(`New list "${newListName}" created and product added.`);
    };

    return (
        <div className="product-card">
            {/* Stock Status Tab */}
            <div
                className="stock-status"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: "white",
                    backgroundColor: productData.stock > 0 ? "#28a745" : "#dc3545",
                }}
            >
                {productData.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            <img src={productImage} alt={productName} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{productName}</h3>
                <p className="product-price">₹{productPrice.toLocaleString()}</p>
                <div className="button-container">
                    {productData.stock > 0 ? (
                        <>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(productData)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="buy-now-btn"
                                onClick={() => buyNow(productData)}
                            >
                                Buy Now
                            </button>
                        </>
                    ) : (
                        <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>
                    )}

                    {/* Add to Shopping List */}
                    <div style={{ marginTop: "10px" }}>
                        <select
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                            style={{
                                padding: "5px",
                                marginRight: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <option value="">Select a List</option>
                            {shoppingLists.map((list) => (
                                <option key={list.name} value={list.name}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddToList}
                            style={{
                                padding: "5px 10px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Add to List
                        </button>
                    </div>

                    {/* Create New List */}
                    <div style={{ marginTop: "10px" }}>
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="New List Name"
                            style={{
                                padding: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                marginRight: "10px",
                            }}
                        />
                        <button
                            onClick={handleCreateNewList}
                            style={{
                                padding: "5px 10px",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Create List
                        </button>
                    </div>
                </div>
            </div>
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
