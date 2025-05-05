// src/pages/StoreOnboardingTabs/CategorySelector.js
import React from 'react';
import '../../../styles/AddProducts.css';

const CategorySelector = ({ categories, onSubcategoryClick, selectedSubcategory }) => {
    return (
        <div className="category-selector">
            {categories.map(category => (
                <div key={category.name} className="category-block">
                    <h3>{category.name}</h3>
                    <div className="subcategory-list">
                        {category.subcategories.map(sub => (
                            <button
                                key={sub.name}
                                className={`subcategory-btn ${selectedSubcategory === sub.name ? 'active' : ''}`}
                                onClick={() => onSubcategoryClick(sub.name)}
                            >
                                {sub.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategorySelector;
