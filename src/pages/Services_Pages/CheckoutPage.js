import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, getTotalPrice, getBuyNowProduct } = useCart();

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        paymentMethod: "credit-card",
    });

    const [errors, setErrors] = useState({});
    const [buyNowProduct, setBuyNowProduct] = useState(null);

    useEffect(() => {
        // Fetch the Buy Now product if it exists
        const product = getBuyNowProduct();
        setBuyNowProduct(product);
    }, [getBuyNowProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        return newErrors;
    };

    const handlePlaceOrder = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const insufficientStock = cart.some(
            (item) => item.stock <= 0 || item.quantity > item.stock
        );
        if (insufficientStock) {
            alert("Some items in your cart are out of stock or have insufficient quantity.");
            return;
        }

        const orderDetails = buyNowProduct
            ? [buyNowProduct]
            : cart.map((item) => ({ ...item }));

        const newOrder = {
            id: `ORD-${Date.now()}`, // Unique order ID
            orderDetails,
            total: buyNowProduct ? buyNowProduct.price : getTotalPrice(),
            date: new Date().toLocaleString(),
            status: "processing",
        };

        // Save order to localStorage and update stock
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]));

        const updatedProducts = JSON.parse(localStorage.getItem("products")).map((product) => {
            const orderedItem = orderDetails.find((item) => item.id === product.id);
            return orderedItem
                ? { ...product, stock: Math.max(0, product.stock - orderedItem.quantity) }
                : product;
        });
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        console.log("Order placed successfully:", newOrder);
        localStorage.removeItem("buyNowProduct");
        navigate("/order-confirmation", { state: { orderDetails } });
    };

    return (
        <div>
            <h1>Checkout</h1>

            {/* Order Summary */}
            <div>
                <h2>Order Summary</h2>
                {buyNowProduct ? (
                    <div style={{ marginBottom: "10px" }}>
                        <h3>{buyNowProduct.name}</h3>
                        <p>Price: ₹{buyNowProduct.price.toLocaleString()}</p>
                        <p>Quantity: {buyNowProduct.quantity}</p>
                    </div>
                ) : cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price.toLocaleString()}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                        <h3>Total: ₹{getTotalPrice().toLocaleString()}</h3>
                    </div>
                )}
            </div>

            {/* Checkout Form */}
            <form>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
                </div>

                <div>
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                </div>

                <div>
                    <label>Payment Method:</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="cash-on-delivery">Cash on Delivery</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handlePlaceOrder}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
