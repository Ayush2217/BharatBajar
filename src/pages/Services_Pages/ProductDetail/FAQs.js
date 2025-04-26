import React from "react";

const FAQs = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div>
            <h2>FAQs</h2>
            <ul>
                {data.map((faq, index) => (
                    <li key={index}>
                        <strong>Q:</strong> {faq.question}
                        <br />
                        <strong>A:</strong> {faq.answer || "No answer available"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQs;
