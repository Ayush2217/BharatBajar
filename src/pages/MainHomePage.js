import React from 'react';
import '../styles/MainHomePage.css'; // Ensure you create corresponding CSS

const MainHomePage = () => {
  return (
    <div className="main-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bharat Ki apni Dukaan, Aapke Saath</h1>
          <p>Celebrate local connections, support nearby stores, and be part of a movement that honors Indian roots and empowers small retailers</p>
          <div className="hero-buttons">
            <button className="cta-button" onClick={() => window.location.href = '/explore'}>
              Explore RM
            </button>
            <button className="cta-button secondary" onClick={() => window.location.href = '/community'}>
              RM Community
            </button>
          </div>
        </div>
      </section>

      {/* Product Carousel */}
      <section className="product-carousel">
        <h2>Featured Products</h2>
        <div className="carousel-container">
          {/* Carousel Items */}
          <div className="carousel-item">Product 1</div>
          <div className="carousel-item">Product 2</div>
          <div className="carousel-item">Product 3</div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-content">
        <h2>Trending in the Community</h2>
        <div className="content-grid">
          <div className="content-tile">User Review</div>
          <div className="content-tile">Unboxing Video</div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability">
        <h2>Our Commitment to a Sustainable Retail Bharat</h2>
        <p>We bring you closer to your trusted local shops—making shopping more affordable, sustainable, and rooted in India’s traditions.</p>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-item">"Amazing service!" - User A</div>
          <div className="testimonial-item">"Great store options!" - User B</div>
        </div>
      </section>
    </div>
  );
};

export default MainHomePage;
