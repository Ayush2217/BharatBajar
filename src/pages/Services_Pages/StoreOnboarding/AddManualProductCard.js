// src/pages/StoreOnboardingTabs/AddManualProductCard.js
import React, { useState } from 'react';
import '../../../styles/AddProducts.css';

const AddManualProductCard = ({ onClose }) => {
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: '',
        quantity: '',
        packSize: '',
        expiry: '',
        tags: '',
        deliveryTime: '',
        image: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Manual product submitted:", form);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="manual-product-card">
                <h3>Add Manual Product</h3>
                <input name="name" placeholder="Product Name" onChange={handleChange} />
                <input name="brand" placeholder="Brand" onChange={handleChange} />
                <input name="price" placeholder="Price" onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" onChange={handleChange} />
                <input name="packSize" placeholder="Pack Size" onChange={handleChange} />
                <input name="expiry" placeholder="Expiry Date" onChange={handleChange} />
                <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
                <input name="deliveryTime" placeholder="Delivery Time" onChange={handleChange} />
                <input name="image" placeholder="Image URL" onChange={handleChange} />
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddManualProductCard;
