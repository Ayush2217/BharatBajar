import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Mock fetch for order history; replace with backend API later
        const mockOrders = localStorage.getItem("orderHistory");
        if (mockOrders) {
            setOrders(JSON.parse(mockOrders));
        }
    }, []);

    const handleCancelOrder = (orderId) => {
        // Simulate backend cancellation logic
        const updatedOrders = orders.map((order) =>
            order.id === orderId
                ? { ...order, status: "Cancelled" }
                : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
        alert("Your order has been cancelled successfully!");
        navigate("/order-history");
    };

    return (
        <div>
            <h1>Cancel Order</h1>
            {orders.length === 0 ? (
                <p>No orders available for cancellation.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} style={{ marginBottom: "20px" }}>
                        <h3>{order.productName}</h3>
                        <p>Price: ₹{order.price.toLocaleString()}</p>
                        <p>Status: {order.status}</p>
                        {order.status !== "Cancelled" && (
                            <button
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    padding: "10px",
                                    cursor: "pointer",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                onClick={() => handleCancelOrder(order.id)}
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CancelOrderPage;
