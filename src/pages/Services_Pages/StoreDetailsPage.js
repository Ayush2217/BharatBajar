import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SalesHeader from '../../components/Common/SalesHeader';
import SalesHeroSection from '../../components/Common/SalesHeroSection';
import SectionHeader from '../../components/Common/SectionHeader';
import ProductCard from '../../components/Common/ProductCard';
import '../../styles/SalesPage.css';

const StoreDetailsPage = () => {
    const { storeName } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [productsBySubcategory, setProductsBySubcategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                // ✅ Fetch store products from backend
				const response = await axios.get(`http://192.168.0.141:8000/api/products/store/${storeName}/`);
				const products = response.data.products || [];

                // ✅ Extract categories and subcategories from products
                const categoryMap = {};
                products.forEach((product) => {
                    const category = product.category || 'Other';
                    const subcategory = product.subcategory || 'Uncategorized';

                    if (!categoryMap[category]) {
                        categoryMap[category] = {};
                    }
                    if (!categoryMap[category][subcategory]) {
                        categoryMap[category][subcategory] = [];
                    }
                    categoryMap[category][subcategory].push(product);
                });

                setCategories(Object.keys(categoryMap));
                setProductsBySubcategory(categoryMap);
                setActiveCategory('');  // ✅ Start with no active category
                setActiveSubcategory('');
            } catch (err) {
                console.error('Error fetching store data:', err);
                setError('Failed to load store data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storeName]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveSubcategory('');  // ✅ Reset subcategory selection
    };
	const handleViewChange = (newView) => {
        if (newView === 'stores') {
            navigate('/stores');
        } else {
            navigate('/salespage');
        }
    };
    const handleSubcategoryClick = (subcategory) => {
        setActiveSubcategory(subcategory);
    };

    if (loading) return <div className="loading-message">Loading store data...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="store-details-page">
            <SalesHeader onViewChange={handleViewChange} />
            <SectionHeader title={`Explore ${storeName}`} />

            {/* ✅ Categories Tabs (Initially Displayed) */}
            <div className="categories-tabs">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category}
                            className={`tab-button ${activeCategory === category ? 'active-tab' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>

            {/* ✅ Subcategories (Only Show When a Category is Selected) */}
            {activeCategory && productsBySubcategory[activeCategory] && (
                <div className="subcategories-tabs">
                    {Object.keys(productsBySubcategory[activeCategory]).map((subcategory) => (
                        <button
                            key={subcategory}
                            className={`subcategory-button ${activeSubcategory === subcategory ? 'active-subcategory' : ''}`}
                            onClick={() => handleSubcategoryClick(subcategory)}
                        >
                            {subcategory}
                        </button>
                    ))}
                </div>
            )}

            {/* ✅ Show Products Only When a Subcategory is Selected */}
            {activeCategory && activeSubcategory && productsBySubcategory[activeCategory][activeSubcategory] && (
                <div className="subcategory-section">
                    <h3 className="subcategory-title">{activeSubcategory}</h3>
                    <div className="product-grid">
                        {productsBySubcategory[activeCategory][activeSubcategory].map((product) => (
                            <ProductCard
                                key={product.name}
                                productName={product.name}
                                productImage={product.image}
                                productPrice={product.price}
                                productStore={product.store}
                                productData={product}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginBottom: "60px" }}>
                <SalesHeroSection />
            </div>
        </div>
    );
};

export default StoreDetailsPage;
