import React, { useState } from 'react';
import '../../styles/ProductFilters.css';

const ProductFilters = ({ filters = {}, onFilterChange = () => {} }) => {
    const [priceRange, setPriceRange] = useState(filters.priceRange || { min: 0, max: 1000 });
    const [brands, setBrands] = useState(filters.brands || []);
    const [ratings, setRatings] = useState(filters.ratings || []);

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
        onFilterChange({ priceRange, brands, ratings });
    };

    const handleBrandChange = (event) => {
        setBrands([...event.target.selectedOptions].map((o) => o.value));
        onFilterChange({ priceRange, brands, ratings });
    };

    const handleRatingsChange = (event) => {
        setRatings(event.target.value);
        onFilterChange({ priceRange, brands, ratings });
    };

    return (
        <div className="product-filters">
            <div className="filter-group">
                <label>Price Range:</label>
                <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    placeholder="Min"
                />
                <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    placeholder="Max"
                />
            </div>
            <div className="filter-group">
                <label>Brands:</label>
                <select multiple value={brands} onChange={handleBrandChange}>
                    <option value="Samsung">Samsung</option>
                    <option value="Apple">Apple</option>
                    <option value="Sony">Sony</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Ratings:</label>
                <select value={ratings} onChange={handleRatingsChange}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars & Up</option>
                    <option value="3">3 Stars & Up</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters;
