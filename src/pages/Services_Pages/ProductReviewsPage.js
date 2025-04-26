import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductReviewsPage = () => {
    const { productId } = useParams(); // Get the product ID from the URL
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

    useEffect(() => {
        // Mock fetch for product reviews; replace with backend API later
        const mockReviews = localStorage.getItem(`reviews_${productId}`);
        if (mockReviews) {
            setReviews(JSON.parse(mockReviews));
        }
    }, [productId]);

    const handleAddReview = () => {
        if (newReview.rating === 0 || newReview.comment.trim() === "") {
            alert("Please provide a rating and comment.");
            return;
        }

        const updatedReviews = [
            ...reviews,
            {
                id: Date.now(),
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toLocaleDateString(),
            },
        ];

        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
        setNewReview({ rating: 0, comment: "" });
        alert("Review submitted successfully!");
    };

    return (
        <div>
            <h1>Product Reviews</h1>

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <p>No reviews yet for this product.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} style={{ marginBottom: "20px" }}>
                        <p>
                            <strong>Rating:</strong> {review.rating} ★
                        </p>
                        <p>
                            <strong>Comment:</strong> {review.comment}
                        </p>
                        <p>
                            <strong>Date:</strong> {review.date}
                        </p>
                        <hr />
                    </div>
                ))
            )}

            {/* Add New Review */}
            <div style={{ marginTop: "20px" }}>
                <h2>Write a Review</h2>
                <label>
                    Rating:
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        style={{ marginLeft: "10px", padding: "5px" }}
                    >
                        <option value="0">Select Rating</option>
                        <option value="1">1 ★</option>
                        <option value="2">2 ★</option>
                        <option value="3">3 ★</option>
                        <option value="4">4 ★</option>
                        <option value="5">5 ★</option>
                    </select>
                </label>
                <div style={{ marginTop: "10px" }}>
                    <textarea
                        placeholder="Write your review here..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        style={{
                            width: "100%",
                            height: "100px",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    ></textarea>
                </div>
                <button
                    onClick={handleAddReview}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ProductReviewsPage;
