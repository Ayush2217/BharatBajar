import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import SectionHeader from '../components/Common/SectionHeader';

const CategoryPage = () => {
    const { categoryName } = useParams(); // Get the category name from the route
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/category/${categoryName}/`);
                setSubcategories(response.data.subcategories || []);
                setProducts(response.data.products || []);
            } catch (err) {
                console.error('Error fetching category data:', err);
                setError('Failed to load category data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [categoryName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="category-page">
            
            <div className="subcategories-container">
                <h3>Subcategories</h3>
                {subcategories.map((subcategory) => (
                    <div key={subcategory} className="subcategory-card">
                        <p>{subcategory}</p>
                    </div>
                ))}
            </div>

            <div className="products-container">
                <h3>Products</h3>
                <div className="product-cards">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>₹{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
