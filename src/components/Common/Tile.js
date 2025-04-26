import React from 'react';
import '../../styles/Tile.css';

const Tile = ({ image, title, onClick }) => {
    return (
        <div className="tile" onClick={onClick}>
            <img src={image} alt={title} className="tile__image" />
            <h4 className="tile__title">{title}</h4>
        </div>
    );
};

export default Tile;
