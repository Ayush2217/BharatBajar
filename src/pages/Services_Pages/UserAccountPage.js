import React from "react";
import "../../styles/UserAccountPage.css";
const UserAccountPage = () => {
    const orderHistory = [
        { id: 1, product: "Mock Product A", status: "Delivered" },
        { id: 2, product: "Mock Product B", status: "Shipped" },
    ];

    return (
        <div>
            <h1>Your Account</h1>
            <h2>Order History</h2>
            {orderHistory.map((order) => (
                <div key={order.id}>
                    <p>
                        {order.product} - <strong>{order.status}</strong>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default UserAccountPage;
