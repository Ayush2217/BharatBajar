import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderTrackingPage = () => {
    const { orderId } = useParams();
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the specific order's tracking details
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const order = savedOrders.find((order) => order.id === orderId);

        if (order) {
            setOrderStatus({
                id: order.id,
                productName: order.orderDetails[0]?.name || "Unknown Product",
                statusUpdates: [
                    { date: "2024-12-25", status: "Order Placed" },
                    { date: "2024-12-26", status: "Packed" },
                    { date: "2024-12-27", status: "Shipped" },
                    { date: "2024-12-29", status: "Out for Delivery" },
                    { date: "2024-12-30", status: "Delivered" },
                ],
            });
        }

        setLoading(false);
    }, [orderId]);

    if (loading) return <div>Loading order tracking details...</div>;

    if (!orderStatus) return <div>No tracking details found for this order.</div>;

    return (
        <div>
            <h1>Track Your Order</h1>
            <h2>Order ID: {orderStatus.id}</h2>
            <h3>Product: {orderStatus.productName}</h3>
            <div style={{ marginTop: "20px" }}>
                {orderStatus.statusUpdates.map((update, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <p>
                            <strong>{update.date}:</strong> {update.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderTrackingPage;
