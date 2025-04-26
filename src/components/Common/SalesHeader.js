import React, { useState } from 'react';
import '../../styles/SalesHeader.css';

const SalesHeader = ({ onViewChange }) => {
    const [activeView, setActiveView] = useState('products');

    const handleViewChange = (view) => {
        setActiveView(view);
        onViewChange(view);
    };

    return (
        <header className="sales-header">
            <button
                className={`header-tile ${activeView === 'products' ? 'active' : ''}`}
                onClick={() => handleViewChange('products')}
                aria-label="View Products"
            >
                View Products
            </button>
            <button
                className={`header-tile ${activeView === 'stores' ? 'active' : ''}`}
                onClick={() => handleViewChange('stores')}
                aria-label="Explore Local Stores"
            >
                Explore Local Stores
            </button>
        </header>
    );
};

export default SalesHeader;
