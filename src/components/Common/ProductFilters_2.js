
import React, { useState, useEffect } from 'react';
import '../../styles/ProductFilters.css';

const ProductFilters = ({ subcategory, onFilterChange = () => {} }) => {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [brands, setBrands] = useState([]);
    const [ratings, setRatings] = useState('');
    const [inStock, setInStock] = useState(false);

    const handleApplyFilters = async () => {
        const params = new URLSearchParams();
        brands.forEach(b => params.append('brand', b));
        if (priceRange.min) params.append('min_price', priceRange.min);
        if (priceRange.max) params.append('max_price', priceRange.max);
        if (ratings) params.append('rating', ratings);
        if (inStock) params.append('in_stock', 'true');

        const res = await fetch(
            `http://127.0.0.1:8000/api/filtered-products/${subcategory}/?${params}`
        );
        const data = await res.json();
        onFilterChange(data.products);
    };

    useEffect(() => {
        handleApplyFilters();
    }, [priceRange, brands, ratings, inStock]);

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        const updated = { ...priceRange, [name]: Number(value) };
        setPriceRange(updated);
    };

    const handleBrandChange = (event) => {
        const selected = [...event.target.selectedOptions].map((o) => o.value);
        setBrands(selected);
    };

    const handleRatingsChange = (event) => {
        setRatings(event.target.value);
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
                    <option value="OnePlus">OnePlus</option>
                    <option value="Realme">Realme</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Ratings:</label>
                <select value={ratings} onChange={handleRatingsChange}>
                    <option value="">All</option>
                    <option value="4">4 Stars & Up</option>
                    <option value="3">3 Stars & Up</option>
                    <option value="2">2 Stars & Up</option>
                </select>
            </div>
            <div className="filter-group">
                <label>
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={() => setInStock(prev => !prev)}
                    />
                    In Stock Only
                </label>
            </div>
        </div>
    );
};

export default ProductFilters;
