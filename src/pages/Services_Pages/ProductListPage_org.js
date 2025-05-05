import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../../styles/ProductListPage.css';
import ProductCard from '../../components/Common/ProductCard';
import ProductFilters from '../../components/Common/ProductFilters';
import Pagination from '../../components/Common/Pagination';
import axios from 'axios';
import { useCart } from "../../contexts/CartContext";

const ProductListPage = () => {
    const { categoryName, subcategoryName } = useParams(); // Get category and subcategory from URL
    const [searchParams] = useSearchParams(); // Get query parameters
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Track filtered products
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (product) {
            addToCart(product);
            console.log(`${product.name} added to cart.`);
        } else {
            console.error("Product is not loaded yet.");
        }
    };

    const handleBuyNow = (product) => {
        console.log(`Proceeding to buy ${product.name}.`);
    };

    const handleProductClick = (productName) => {
        navigate(`/product-details/${encodeURIComponent(productName)}`);
    };

    // const handleFilterChange = (filters) => {
    //     // Apply filters to the products
    //     const { brand, priceRange, ratings } = filters;
    //     const filtered = products.filter((product) => {
    //         const matchesBrand = brand ? product.brand === brand : true;
    //         const matchesPrice = priceRange ? product.price >= priceRange[0] && product.price <= priceRange[1] : true;
    //         const matchesRatings = ratings ? product.rating >= ratings : true;
    //         return matchesBrand && matchesPrice && matchesRatings;
    //     });
    //     setFilteredProducts(filtered);
    //     paginateProducts(filtered, 1); // Reset pagination with filtered data
    // };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : null;
                const decodedSubcategoryName = subcategoryName ? decodeURIComponent(subcategoryName) : null;
                const brandFilter = searchParams.get('brand') ? decodeURIComponent(searchParams.get('brand')) : null;

                const apiUrl = brandFilter
                    ? `http://127.0.0.1:8000/api/products/${decodedSubcategoryName}/?brand=${encodeURIComponent(brandFilter)}`
                    : `http://127.0.0.1:8000/api/products/${decodedSubcategoryName || ''}/`;

                const response = await axios.get(apiUrl);
                const fetchedProducts = response.data.products || [];
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts); // Initially show all products
                paginateProducts(fetchedProducts, 1);
            } catch (err) {
                console.error('Error loading products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, subcategoryName, searchParams]);

    const paginateProducts = (allProducts, page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setPaginatedProducts(allProducts.slice(start, end));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        paginateProducts(filteredProducts, page); // Paginate filtered products
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-list-page">
            <h1>
                {subcategoryName ? `${subcategoryName} in ${categoryName}` : categoryName}
            </h1>

            <div className="filters-container">
                <ProductFilters
                    subcategory={subcategoryName}
                    onFilterChange={(filtered) => {
                        setFilteredProducts(filtered);
                        paginateProducts(filtered, 1); // reset to page 1 on new filter
                    }}
                />
            </div>

            <div className="product-grid">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.name}
                            productName={product.name}
                            productImage={product.image}
                            productPrice={product.price}
                            productData={product}
                            onAddToCart={() => handleAddToCart(product)}
                            onBuyNow={() => handleBuyNow(product)}
                            onClick={() => handleProductClick(product.name)}
                        />
                    ))
                ) : (
                    <p>No products available for this category.</p>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                setPage={handlePageChange}
                totalItems={filteredProducts.length} // Use filtered products count
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default ProductListPage;
