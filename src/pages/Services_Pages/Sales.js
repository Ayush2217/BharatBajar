import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SalesHeader from '../../components/Common/SalesHeader';
import SalesHeroSection from '../../components/Common/SalesHeroSection';
import SectionHeader from '../../components/Common/SectionHeader';
import '../../styles/SalesPage.css';
import '../../styles/RepairProtectionPage.css';

import CommunityImage from '../../assets/community_banner.png';

const SalesPage = () => {
    const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const checkMobile = () => {
		setIsMobile(window.innerWidth <= 768);
		};

		checkMobile(); // initial check
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);
    const [view, setView] = useState('products');
    const [categories, setCategories] = useState([]); // Default to empty array
    const [dealsItems, setDealsItems] = useState([]); // Default to empty array
    const [engagementItems, setEngagementItems] = useState([]); // Default to empty array
    const [personalizedItems, setPersonalizedItems] = useState([]); // Default to empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [activeCategory, setActiveCategory] = useState('');
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, dealsResponse, engagementResponse, personalizedResponse] = await Promise.all([
					axios.get('http://192.168.0.141:8000/api/categories/'),
					axios.get('http://192.168.0.141:8000/api/deals/'),
					axios.get('http://192.168.0.141:8000/api/engagement-items/'),
					axios.get('http://192.168.0.141:8000/api/personalized-items/'),
				]);


                setCategories(categoriesResponse.data.categories || []); // Handle undefined
                setDealsItems(dealsResponse.data.deals || []); // Handle undefined
                setEngagementItems(engagementResponse.data.engagementItems || []); // Handle undefined
                setPersonalizedItems(personalizedResponse.data.personalizedItems || []); // Handle undefined
                setActiveCategory(categoriesResponse.data.categories?.[0]?.title || ''); // Default category
				
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
	const handleCategoryClick = (categoryName, subcategoryName) => {
		if (subcategoryName) {
			navigate(`/category/${categoryName.toLowerCase()}/${subcategoryName.toLowerCase()}`);
		} else {
			navigate(`/category/${categoryName.toLowerCase()}`);
		}
	};


    const handleViewChange = (newView) => {
		if (newView === 'stores') {
			navigate('/stores');
		} else {
        setView(newView);
		}
	};


    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="sales-page">
            {isMobile ? (
  <div className="mobile-button-group">
    <button
      onClick={() => handleViewChange('products')}
      className={`mobile-button primary ${view === 'products' ? 'active-tab' : ''}`}
    >
      View Products
    </button>
    <button
      onClick={() => handleViewChange('stores')}
      className={`mobile-button secondary ${view === 'stores' ? 'active-tab' : ''}`}
    >
      Explore Local Stores
    </button>
  </div>
) : (
  <SalesHeader onViewChange={handleViewChange} />
)}



            <SectionHeader title="India’s Retail Heartbeat – Everything You Need, From Your Own" />

            {/* Categories Tabs */}
            <div className="categories-tabs">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.title}
                            className={`tab-button ${activeCategory === category.title ? 'active-tab' : ''}`}
                            onClick={() => setActiveCategory(category.title)}
                        >
                            <div className="category-tab-content">
								<img src={category.image} alt={category.title} className="category-icon" />
								<span>{category.title}</span>
							</div>

                        </button>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>

            {/* Subcategories */}
            <div className="subcategories-container">
			{categories
			.find((category) => category.title === activeCategory)
				?.subcategories?.map((subcategory) => (
				<div key={subcategory} className="subcategory-card">
				<button
				onClick={() => handleCategoryClick(activeCategory, subcategory)}
					className="subcategory-button"
					>
					<img
						src={
						categories.find((category) => category.title === activeCategory)
						?.image
					}
					alt={subcategory}
					className="subcategory-icon"
				/>
				<span>{subcategory}</span>
				</button>
			</div>
			)) || <p>No subcategories available.</p>}
			</div>



            <SalesHeroSection />

            <div className="deals-community-container">
                <div className="deals-container">
                    <SectionHeader title="Deals and Discounts" />
                    <div className="deal-cards">
                        {dealsItems.length > 0 ? (
                            dealsItems.map((item, index) => (
                                <div key={index} className="deal-card">
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>₹{item.price}</p>
                                </div>
                            ))
                        ) : (
                            <p>No deals available.</p>
                        )}
                    </div>
                </div>

                <div className="community-container">
                    <SectionHeader title="Community Picks" />
                    <div className="community-cards">
                        {engagementItems.length > 0 ? (
                            engagementItems.map((item, index) => (
                                <div key={index} className="community-card">
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No community picks available.</p>
                        )}
                    </div>
                </div>

                <div className="community-banner">
                    <img src={CommunityImage} alt="Community Banner" />
                </div>
            </div>

            {/* Personalized Section */}
            <div className="personalized-section">
				<SectionHeader title="Personalized for You" />
				<div className="personalized-cards-container">
						{personalizedItems.length > 0 ? (
							personalizedItems.map((item, index) => (
								<div key={index} className="personalized-card">
									<img 
										src={item.image}  // ✅ Use this directly
										alt={item.title} 
										className="personalized-card-image" 
									/>

										<h3>{item.title}</h3>
									<p>₹{item.price}</p>
								</div>
							))
						) : (
					<	p>No personalized items available.</p>
					)}
				</div>
			</div>

        </div>
    );
};

export default SalesPage;
