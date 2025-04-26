import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // Fetch order details from localStorage
        const savedOrderData = localStorage.getItem("orderData");
        if (savedOrderData) {
            setOrderData(JSON.parse(savedOrderData));
        }
    }, []);

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handlePayment = () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Simulate payment processing
        setPaymentProcessing(true);
        setTimeout(() => {
            setPaymentProcessing(false);

            // Save the current order to the order history in localStorage
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const newOrder = {
                id: `ORD-${Date.now()}`,
                orderDetails: orderData.orderDetails,
                total: orderData.total,
                date: new Date().toLocaleString(),
                status: "processing", // Default status
            };
            localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]));

            alert("Payment successful!");
            navigate("/order-confirmation");
        }, 2000); // Simulated delay for payment
    };

    if (!orderData) return <div>Loading order details...</div>;

    return (
        <div>
            <h1>Payment Page</h1>

            {/* Order Summary */}
            <div style={{ marginBottom: "20px" }}>
                <h2>Order Summary</h2>
                {orderData.orderDetails.map((item, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price.toLocaleString()}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
                <h3>Total: ₹{orderData.total.toLocaleString()}</h3>
            </div>

            {/* Payment Options */}
            <div style={{ marginBottom: "20px" }}>
                <h2>Choose Payment Method</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Credit Card"
                            checked={selectedPaymentMethod === "Credit Card"}
                            onChange={handlePaymentMethodChange}
                        />
                        Credit Card
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Debit Card"
                            checked={selectedPaymentMethod === "Debit Card"}
                            onChange={handlePaymentMethodChange}
                        />
                        Debit Card
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Cash on Delivery"
                            checked={selectedPaymentMethod === "Cash on Delivery"}
                            onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                    </label>
                </div>
            </div>

            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={paymentProcessing}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: paymentProcessing ? "not-allowed" : "pointer",
                }}
            >
                {paymentProcessing ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};

export default PaymentPage;
