// src/pages/StoreOnboardingTabs/ProductCatalog.js
import React from 'react';
import ProductCardStore from '../../../components/Common/ProductCardStore'; // <-- ensure correct path
import '../../../styles/AddProducts.css';

const ProductCatalog = ({ subcategory, onBack, onAddToStore }) => {
  const products = Array.isArray(subcategory.products) ? subcategory.products : [];

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: '10px' }}>← Back to Subcategories</button>
      <h3>Products in {subcategory.name}</h3>
      {products.length === 0 ? (
        <p>No products found for this subcategory.</p>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCardStore
              key={index}
              product={product}
              onAddToStore={onAddToStore} // ✅ This is essential
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default ProductCatalog;
