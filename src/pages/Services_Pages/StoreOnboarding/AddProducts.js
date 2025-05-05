// src/pages/StoreOnboardingTabs/AddProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelector from './CategorySelector';
import ProductCatalog from './ProductCatalog';
import AddManualProductCard from './AddManualProductCard';
import '../../../styles/AddProducts.css';

const AddProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [showManualModal, setShowManualModal] = useState(false);

    useEffect(() => {
        axios.get('http://192.168.0.141:8000/api/categories/')
            .then(res => setCategories(res.data.categories || []))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleSubcategoryClick = async (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/products/${subcategoryName}/`);
            setProducts(res.data.products || []);
        } catch (err) {
            console.error(`Error fetching products for ${subcategoryName}:`, err);
            setProducts([]);
        }
    };

    return (
        <div className="add-products-page">
            <h2>Select Products for Your Store</h2>
            <CategorySelector
                categories={categories}
                onSubcategoryClick={handleSubcategoryClick}
                selectedSubcategory={selectedSubcategory}
            />
            <button className="manual-btn" onClick={() => setShowManualModal(true)}>
                + Add Manual Product
            </button>
            <ProductCatalog products={products} />
            {showManualModal && (
                <AddManualProductCard onClose={() => setShowManualModal(false)} />
            )}
        </div>
    );
};

export default AddProducts;
