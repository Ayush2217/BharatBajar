import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  RatingMenu,
  ToggleRefinement,
  Configure,
  connectSortBy,
} from 'react-instantsearch-dom';
import '../../styles/ProductListPage.css';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const searchClient = algoliasearch('8MRLOZ7A26', '489c1269a1685a0990ecf6569113b29c');

// 🛠 Static category and subcategory selected
const FIXED_CATEGORY = "Mobile Devices & Accessories";
const FIXED_SUBCATEGORY = "Smart Watches";

const ProductCardAlgolia = ({ hit }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <h4 className="store-name">Store: {hit.store_name || 'Unknown Store'}</h4>
      <img src={hit.image || 'https://via.placeholder.com/300'} alt={hit.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{hit.name}</h3>
        <p className="product-price">₹{hit.price ? hit.price.toLocaleString() : 'N/A'}</p>
        <div className="button-container">
          <button onClick={() => { addToCart(hit); navigate('/cart'); }}>Add to Cart</button>
          <button onClick={() => navigate('/checkout')}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const CustomSortBy = connectSortBy(({ items, currentRefinement, refine }) => (
  <select
    value={currentRefinement}
    onChange={(event) => refine(event.target.value)}
    style={{ padding: '5px', marginBottom: '20px' }}
  >
    {items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
));

const ProductListPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [indexName, setIndexName] = useState('mobile_device1');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceFilterString, setPriceFilterString] = useState('');

  const applyPriceFilter = (min, max) => {
    const filters = [];
    if (min) filters.push(`price >= ${min}`);
    if (max) filters.push(`price <= ${max}`);
    setPriceFilterString(filters.join(' AND '));
  };

  return (
    <div className="product-list-page">
      <h1>{FIXED_SUBCATEGORY ? `${FIXED_SUBCATEGORY} in ${FIXED_CATEGORY}` : FIXED_CATEGORY}</h1>

      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure
          filters={`subcategory:"${FIXED_SUBCATEGORY}"${priceFilterString ? ` AND ${priceFilterString}` : ''}`}
        />

        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="sidebar">
            <h3>Filters</h3>
            <RefinementList attribute="brand" />
            <div style={{ marginTop: '20px' }}>
              <label style={{ fontWeight: 600 }}>Price Range</label>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ marginTop: 5, marginBottom: 5, padding: '5px', width: '100%' }}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ marginBottom: 10, padding: '5px', width: '100%' }}
              />
              <button
                onClick={() => applyPriceFilter(minPrice, maxPrice)}
                style={{ padding: '5px', width: '100%' }}
              >
                Apply Price Filter
              </button>
            </div>
            <RatingMenu attribute="rating" />
            <ToggleRefinement attribute="stock" label="In Stock Only" />
          </div>

          <div style={{ flex: 1 }}>
            <SearchBox translations={{ placeholder: 'Search products...' }} />

            <select
              value={indexName}
              onChange={(e) => setIndexName(e.target.value)}
              style={{ padding: '5px', marginBottom: '20px' }}
            >
              <option value="mobile_device1">Relevance</option>
              <option value="mobile_device1_price_asc">Price Low to High</option>
              <option value="mobile_device1_price_desc">Price High to Low</option>
            </select>

            <div className="product-grid">
              <Hits hitComponent={ProductCardAlgolia} />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default ProductListPage;
