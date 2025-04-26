import React from "react";

const Specifications = ({ data }) => {
    if (!data) return null;

    return (
        <div>
            <h2>Specifications</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <td style={{ padding: "8px", fontWeight: "bold" }}>{key}</td>
                            <td style={{ padding: "8px" }}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Specifications;
