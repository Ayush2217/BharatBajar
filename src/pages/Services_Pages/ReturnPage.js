// src/pages/Services_Pages/ReturnPage.js
import React, { useState } from "react";
import "../../styles/ReturnPage.css";
const ReturnPage = () => {
    const [reason, setReason] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Return request submitted successfully!");
    };

    return (
        <div>
            <h1>Return or Replace Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Reason for Return:</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReturnPage;
