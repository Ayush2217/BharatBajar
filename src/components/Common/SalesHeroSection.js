import React, { useEffect, useState } from 'react';
import '../../styles/SalesHeroSection.css';
import Banner1 from '../../assets/Banner5.png';
import Banner2 from '../../assets/Banner6.png';
import Banner3 from '../../assets/Banner7.png';
import Banner4 from '../../assets/Banner8.png';
// Import additional images like Banner2, Banner3 if available

const SalesHeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [Banner4,Banner2, Banner3, Banner4 /* Add more images like Banner2, Banner3 here */];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="sales-hero-section">
            <div className="hero-carousel">
                <img src={banners[currentIndex]} alt={`Banner ${currentIndex + 1}`} className="hero-image" />
            </div>
            <button className="carousel-control prev" onClick={() => setCurrentIndex((currentIndex - 1 + banners.length) % banners.length)}>
                &#10094;
            </button>
            <button className="carousel-control next" onClick={() => setCurrentIndex((currentIndex + 1) % banners.length)}>
                &#10095;
            </button>
        </div>
    );
};

export default SalesHeroSection;
