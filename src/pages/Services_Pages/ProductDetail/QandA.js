import React from "react";

const QandA = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div>
            <h2>Questions & Answers</h2>
            <ul>
                {data.map((qa, index) => (
                    <li key={index}>
                        <strong>Q:</strong> {qa.question}
                        <br />
                        <strong>A:</strong> {qa.answer || "No answer yet"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QandA;
