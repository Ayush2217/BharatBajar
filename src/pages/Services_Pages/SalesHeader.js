import React from 'react';
import '../../styles/SalesHeader.css';

const SalesHeader = () => {
    return (
        <header className="sales-header">
            <h1 className="page-title">Electronics Sales</h1>
            <nav className="sales-nav">
                <ul className="nav-links">
                    <li><a href="#laptops">Laptops</a></li>
                    <li><a href="#smartphones">Smartphones</a></li>
                    <li><a href="#tablets">Tablets</a></li>
                    <li><a href="#accessories">Accessories</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default SalesHeader;
