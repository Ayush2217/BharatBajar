// src/components/Store/ProductCardStore.js
import React, { useState, useEffect } from 'react';
import '../../styles/ProductCardStore.css';

const ProductCardStore = ({ product, onAddToStore, isListedView = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize color and quantity
  useEffect(() => {
    if (isListedView) {
      setQuantity(product?.quantity || 1);
      setColor(product?.selectedColor || '');
    } else {
      setColor(
        Array.isArray(product?.colors) && product.colors.length > 0
          ? product.colors[0]
          : ''
      );
    }
  }, [product, isListedView]);

  const handleAdd = () => {
    const productToAdd = {
      ...product,
      quantity,
      selectedColor: color,
    };
    if (onAddToStore) onAddToStore(productToAdd);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="store-product-card">
      <img
        src={product?.image || '/placeholder.png'}
        alt={product?.name || 'Product'}
        className="product-image"
      />
      <h4>{product?.name}</h4>
      <p><strong>Brand:</strong> {product?.brand}</p>
      <p><strong>Price:</strong> ₹{product?.price}</p>

      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          min={1}
          disabled={isListedView || (!isEditing && !isListedView)}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      {Array.isArray(product?.colors) && product.colors.length > 0 && (
        <label>
          Color:
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={isListedView || (!isEditing && !isListedView)}
          >
            {product.colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      )}

      {!isListedView && (
        <div style={{ marginTop: '10px' }}>
          {!isEditing ? (
            <button className="edit-btn" onClick={toggleEdit}>
              ✏️ Edit
            </button>
          ) : (
            <button className="save-btn" onClick={toggleEdit}>
              ✅ Done Editing
            </button>
          )}
          <button className="add-btn" onClick={handleAdd}>
            Add to Store
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardStore;
