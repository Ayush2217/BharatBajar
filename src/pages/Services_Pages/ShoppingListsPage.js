import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingListsPage = () => {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [newListName, setNewListName] = useState("");
    const [showCreateNewListInput, setShowCreateNewListInput] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedLists = localStorage.getItem("shoppingLists");
        if (savedLists) {
            setShoppingLists(JSON.parse(savedLists));
        }
    }, []);

    const createNewList = () => {
        if (!newListName.trim()) {
            alert("List name cannot be empty.");
            return;
        }

        const updatedLists = [...shoppingLists, { name: newListName, items: [] }];
        setShoppingLists(updatedLists);
        localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
        setNewListName(""); // Clear the input
        setShowCreateNewListInput(false); // Hide input field
    };

    const deleteList = (listName) => {
        const updatedLists = shoppingLists.filter((list) => list.name !== listName);
        setShoppingLists(updatedLists);
        localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
    };

    const handleProductClick = (product) => {
        if (product.stock > 0) {
            navigate(`/product-details/${encodeURIComponent(product.name)}`);
        } else {
            alert(`${product.name} is out of stock and cannot be viewed.`);
        }
    };

    const handleRemoveItem = (listName, productIndex) => {
        const updatedLists = shoppingLists.map((list) =>
            list.name === listName
                ? { ...list, items: list.items.filter((_, index) => index !== productIndex) }
                : list
        );
        setShoppingLists(updatedLists);
        localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
    };

    const handleSaveForLater = (product) => {
        alert(`${product.name} has been saved for later.`);
        // Implement the "Save for Later" logic if needed.
    };

    return (
        <div>
            <h1>Shopping Lists</h1>

            {/* Button to show input for creating a new list */}
            <div style={{ marginBottom: "20px" }}>
                {!showCreateNewListInput && (
                    <button
                        onClick={() => setShowCreateNewListInput(true)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Create New List
                    </button>
                )}
            </div>

            {/* Input field for new list */}
            {showCreateNewListInput && (
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="New List Name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        style={{ padding: "10px", marginRight: "10px" }}
                    />
                    <button
                        onClick={createNewList}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                        }}
                    >
                        Save List
                    </button>
                    <button
                        onClick={() => {
                            setShowCreateNewListInput(false);
                            setNewListName("");
                        }}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Existing shopping lists */}
            {shoppingLists.length === 0 ? (
                <p>No shopping lists found.</p>
            ) : (
                shoppingLists.map((list) => (
                    <div key={list.name} style={{ marginBottom: "20px" }}>
                        <h3>{list.name}</h3>
                        <div>
                            {list.items.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: item.stock > 0 ? "pointer" : "not-allowed",
                                        }}
                                        onClick={() => handleProductClick(item)}
                                    >
                                        <img
                                            src={item.image || "https://via.placeholder.com/100"}
                                            alt={item.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "5px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>Price: ₹{item.price.toLocaleString()}</p>
                                            {item.stock <= 0 && (
                                                <p style={{ color: "red", fontWeight: "bold" }}>
                                                    Out of Stock
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleRemoveItem(list.name, index)}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleSaveForLater(item)}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Save for Later
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => deleteList(list.name)}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                padding: "10px",
                                cursor: "pointer",
                                border: "none",
                                borderRadius: "5px",
                            }}
                        >
                            Delete List
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoppingListsPage;
