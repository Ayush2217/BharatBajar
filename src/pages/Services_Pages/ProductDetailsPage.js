import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductDetailPage.css";
import { useCart } from "../../contexts/CartContext";

// Import modular components
import Overview from "./ProductDetail/Overview";
import Specifications from "./ProductDetail/Specifications";
import Offers from "./ProductDetail/Offers";
import Details from "./ProductDetail/Details";
import Reviews from "./ProductDetail/Reviews";
import DeliveryOptions from "./ProductDetail/DeliveryOptions";
import RelatedProducts from "./ProductDetail/RelatedProducts";
import ReturnPolicy from "./ProductDetail/ReturnPolicy";

const ProductDetailPage = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, addToWishlist } = useCart();

    // Function to generate a unique ID for the product based on its name and timestamp
    const generateUniqueId = (name) => {
        return `${name}-${Date.now()}`;
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Fetch the product data from backend API
                const response = await fetch(`/api/products/${productName}`); // Replace with your API endpoint
                const data = await response.json();

                // Assign a unique ID if the backend doesn't provide one
                const productWithId = data.id ? data : { ...data, id: generateUniqueId(data.name) };
                setProduct(productWithId);
            } catch (error) {
                console.error("Error fetching product data:", error);

                // Fallback mock product data for testing
                const mockProductData = {
                    name: productName || "Default Product Name",
                    description: "This is a high-quality product description for demonstration purposes.",
                    price: 49999,
                    originalPrice: 59999,
                    discount: "17%",
                    brand: "MockBrand",
                    rating: 4.5,
                    reviews: 128,
					store: "Gadget Galaxy",
                    image: "https://via.placeholder.com/300",
                    highlights: [
                        "6.7-inch Super Retina XDR display",
                        "A15 Bionic chip for lightning-fast performance",
                        "Triple-camera system for stunning photos and videos",
                        "5G enabled for ultra-fast connectivity",
                    ],
                    specifications: {
                        "Screen Size": "6.7 inches",
                        Processor: "A15 Bionic",
                        Battery: "4500mAh",
                        Camera: "12MP + 12MP + 12MP",
                        OS: "iOS 15",
                        Storage: "128GB",
                    },
                    warranty: "1 year manufacturer warranty",
                    stock: 10,
                    deliveryOptions: "Available within 3-5 business days",
                    offers: [
                        "10% Instant Discount on SBI Credit Card.",
                        "Get extra ₹1000 off on Exchange.",
                        "No Cost EMI available.",
                    ],
                    details: [
                        "1 Year Manufacturer Warranty",
                        "Return Policy: 7 Days Replacement",
                        "Delivery in 3-5 business days",
                    ],
                    relatedProducts: [{ name: "Product A" }, { name: "Product B" }, { name: "Product C" }],
                    returnPolicy: "7 days return policy available for this product.",
                };

                // Assign a unique ID to the mock data
                setProduct({ ...mockProductData, id: generateUniqueId(mockProductData.name) });
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productName]);
	const handleAddToWishlist = () => {
        addToWishlist(product);
        // Show notification using built-in alert
        alert(`${product.name} has been added to your wishlist!`);
    };

    if (loading) return <div>Loading product details...</div>;
    if (!product) return <div>No product data available.</div>;

    return (
        <div className="product-detail-page" style={{ padding: "20px" }}>
            {/* Stock Status */}
            <div
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    backgroundColor: product.stock > 0 ? "#28a745" : "#dc3545",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "5px",
                }}
            >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            {/* Overview Section */}
            <Overview
                data={product}
                onAddToCart={product.stock > 0 ? () => addToCart(product) : null}
                onBuyNow={product.stock > 0 ? () => console.log(`Proceeding to buy ${product.name}`) : null}
            />

            {/* Wishlist and Shopping List Buttons */}
            {/* Wishlist and Shopping List Buttons */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    onClick={handleAddToWishlist}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#ffc107",
                        color: "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                >
                    Add to Wishlist
                </button>
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: product.stock > 0 ? "#007bff" : "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: product.stock > 0 ? "pointer" : "not-allowed",
                    }}
                    disabled={product.stock === 0}
                >
                    {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                </button>
            </div>

            {/* Specifications Section */}
            <Specifications data={product.specifications} />

            {/* Offers Section */}
            <Offers data={product.offers} />

            {/* Details Section */}
            <Details data={product.details} />

            {/* Reviews Section */}
            <Reviews
                data={{
                    rating: product.rating,
                    count: product.reviews,
                    highlights: product.highlights,
                }}
            />

            {/* Delivery Options Section */}
            <DeliveryOptions data={product.deliveryOptions} />

            {/* Related Products Section */}
            <RelatedProducts data={product.relatedProducts} />

            {/* Return Policy Section */}
            <ReturnPolicy data={product.returnPolicy} />
        </div>
    );
};

export default ProductDetailPage;
