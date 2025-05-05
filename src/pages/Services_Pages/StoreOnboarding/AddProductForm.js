import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCatalog from './ProductCatalog';

const AddProductForm = ({ listedProducts, setListedProducts }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // used to toggle catalog view

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => {
        setCategories(res.data.categories || []);
        setActiveCategory(res.data.categories?.[0]?.title || '');
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  const handleSubcategoryClick = async (subcategoryName) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/products/${encodeURIComponent(subcategoryName)}/`);
      const productList = res.data.products || res.data || [];
      setSelectedSubcategory({ name: subcategoryName, category: activeCategory, products: productList });
    } catch (err) {
      console.error('Error fetching products:', err);
      setSelectedSubcategory({ name: subcategoryName, category: activeCategory, products: [] });
    }
  };

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null); // back to subcategory list
  };

  return (
    <div style={{ padding: '20px' }}>
      {selectedSubcategory ? (
        <ProductCatalog
          subcategory={selectedSubcategory}
          onBack={handleBackToSubcategories}
          onAddToStore={(product) => {
            setListedProducts((prev) => [...prev, product]);
            alert(`${product.name} added to your store.`);
          }}
        />
      ) : (
        <>
          <h2>Select a Category</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(cat.title)}
                style={{
                  padding: '10px 15px',
                  background: activeCategory === cat.title ? '#007bff' : '#eee',
                  color: activeCategory === cat.title ? '#fff' : '#000',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <h3>Subcategories</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 10 }}>
            {categories.find(c => c.title === activeCategory)?.subcategories?.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubcategoryClick(sub)}
                style={{
                  padding: '8px 12px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddProductForm;
