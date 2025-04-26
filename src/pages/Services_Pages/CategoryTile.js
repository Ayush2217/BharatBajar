// src/components/CategoryTile.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CategoryTile.css';

const CategoryTile = ({ categoryName, imageSrc, onTileClick }) => {
    return (
        <div className="category-tile" onClick={onTileClick}>
            <img src={imageSrc} alt={categoryName} className="category-image" />
            <h3 className="category-name">{categoryName}</h3>
        </div>
    );
};

CategoryTile.propTypes = {
    categoryName: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    onTileClick: PropTypes.func.isRequired,
};

export default CategoryTile;
