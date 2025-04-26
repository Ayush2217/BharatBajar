import React, { useState, useEffect } from "react";

const OffersPage = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // Mock fetch for offers; replace with backend API later
        const mockOffers = [
            {
                id: 1,
                title: "10% Instant Discount on SBI Credit Cards",
                description: "Valid on minimum purchase of ₹5,000.",
                validTill: "2024-12-31",
            },
            {
                id: 2,
                title: "Buy 2 Get 1 Free",
                description: "Applicable on selected categories.",
                validTill: "2024-12-25",
            },
            {
                id: 3,
                title: "Flat ₹1,000 Off on Exchange",
                description: "Available for smartphones and laptops.",
                validTill: "2024-12-30",
            },
        ];

        // Simulate an API call delay
        setTimeout(() => {
            setOffers(mockOffers);
        }, 1000);
    }, []);

    return (
        <div>
            <h1>Offers & Promotions</h1>
            {offers.length === 0 ? (
                <p>Loading offers...</p>
            ) : (
                offers.map((offer) => (
                    <div key={offer.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
                        <h3>{offer.title}</h3>
                        <p>{offer.description}</p>
                        <p>
                            <strong>Valid Till:</strong> {offer.validTill}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OffersPage;
