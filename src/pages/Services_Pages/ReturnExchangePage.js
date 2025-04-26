import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReturnExchangePage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const selectedOrder = savedOrders.find((o) => o.id === orderId);
        setOrder(selectedOrder || null);
    }, [orderId]);

    const updateOrderStatus = (newStatus) => {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrders = savedOrders.map((o) => 
            o.id === orderId ? { ...o, status: newStatus } : o
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        navigate("/order-history"); // Redirect to Order History after updating
    };

    const handleReturnRequest = () => {
        console.log(`Return requested for order: ${orderId}`);
        updateOrderStatus("cancelled");
        alert("Return request submitted successfully!");
    };

    const handleExchangeRequest = (replacement) => {
        console.log(`Exchange requested for order: ${orderId}, Replacement: ${replacement}`);
        updateOrderStatus("cancelled");
        alert("Exchange request submitted successfully!");
    };

    if (!order) return <div>No order found for return or exchange.</div>;

    return (
        <div>
            <h1>Return/Exchange Page</h1>
            <h3>Order ID: {order.id}</h3>
            {order.orderDetails.map((product, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <p>Product: {product.name}</p>
                    <p>Price: ₹{product.price.toLocaleString()}</p>
                    <button
                        style={{
                            marginRight: "10px",
                            backgroundColor: "#ffcc00",
                            padding: "10px",
                            cursor: "pointer",
                            border: "none",
                            borderRadius: "5px",
                        }}
                        onClick={handleReturnRequest}
                    >
                        Request Return
                    </button>
                    <button
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px",
                            cursor: "pointer",
                            border: "none",
                            borderRadius: "5px",
                        }}
                        onClick={() => handleExchangeRequest("Replacement Variant")}
                    >
                        Request Exchange
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ReturnExchangePage;
