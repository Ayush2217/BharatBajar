import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CategoryTile.css';

const CategoryTile = ({ categoryName, imageSrc, onTileClick, isStore }) => {
    return (
        <div className={`category-tile ${isStore ? 'store-category' : 'product-category'}`} onClick={onTileClick}>
            <img src={imageSrc} alt={categoryName} className="category-image" />
            <h3 className="category-name">{categoryName}</h3>
        </div>
    );
};

CategoryTile.propTypes = {
    categoryName: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    onTileClick: PropTypes.func.isRequired,
    isStore: PropTypes.bool // New prop to distinguish store tiles from product tiles
};

export default CategoryTile;
