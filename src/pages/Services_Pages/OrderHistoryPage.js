import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleProductClick = (productName) => {
        navigate(`/product-details/${encodeURIComponent(productName)}`);
    };

    const filteredOrders = orders.filter((order) =>
        filter === "all" ? true : order.status === filter
    );

    return (
        <div>
            <h1>Order History</h1>

            {/* Filters */}
            <div>
                <label>Filter by Status: </label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Order List */}
            <div style={{ marginTop: "20px" }}>
                {filteredOrders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                marginBottom: "20px",
                                borderRadius: "5px",
                            }}
                        >
                            <h3>Order #{order.id}</h3>
                            <p>Status: {order.status}</p>
                            <p>Date: {order.date}</p>
                            <p>Total: ₹{order.total.toLocaleString()}</p>

                            <h4>Products:</h4>
                            {order.orderDetails.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product.name)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={product.image || "https://via.placeholder.com/100"}
                                        alt={product.name}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            marginRight: "10px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <div>
                                        <h5>{product.name}</h5>
                                        <p>Price: ₹{product.price.toLocaleString()}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <button
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                                onClick={() => navigate(`/order-tracking/${order.id}`)}
                            >
                                Track Order
                            </button>
                            <button
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#ffcc00",
                                    color: "black",
                                    border: "none",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                                onClick={() => navigate(`/return-exchange/${order.id}`)}
                            >
                                Return/Exchange
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
