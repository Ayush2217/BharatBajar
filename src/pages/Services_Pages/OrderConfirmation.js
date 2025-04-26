import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { cart, removeFromCart } = useCart();

    useEffect(() => {
        if (state?.orderDetails) {
            // Clear the cart by removing the ordered items
            state.orderDetails.forEach((item) => {
                removeFromCart(item.id);
            });
        }
    }, [state, removeFromCart]);

    if (!state || !state.orderId) {
        return <div>Error: Order details are missing.</div>;
    }

    return (
        <div>
            <h1>Order Confirmed!</h1>
            <p>Your order has been placed successfully.</p>
            <h3>Order ID: {state.orderId}</h3>
            <button onClick={() => navigate(`/order-tracking/${state.orderId}`)}>
                Track Order
            </button>
            <button onClick={() => navigate(`/return-exchange/${state.orderId}`)}>
                Return/Exchange
            </button>
        </div>
    );
};

export default OrderConfirmation;
