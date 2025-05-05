import React from 'react';
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  RangeInput,
  RatingMenu,
  ToggleRefinement,
  SortBy,
} from 'react-instantsearch-dom';
import '../../styles/ProductListPage.css';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const searchClient = algoliasearch('8MRLOZ7A26', '489c1269a1685a0990ecf6569113b29c');

const ProductCardAlgolia = ({ hit }) => {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={hit.image_uri || 'https://via.placeholder.com/300'} alt={hit.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{hit.name}</h3>
        <p className="product-price">₹{hit.price.toLocaleString()}</p>
        <div className="button-container">
          <button onClick={() => { addToCart(hit); navigate('/cart'); }}>Add to Cart</button>
          <button onClick={() => { buyNow(hit); navigate('/checkout'); }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const AlgoliaProductList = () => (
  <div className="product-list-page">
    <h1>Explore Products</h1>

    <InstantSearch indexName="mobile_device1" searchClient={searchClient}>
      <div className="filters-container" style={{ display: 'flex', gap: '20px' }}>
        <div className="sidebar" style={{ flex: '0 0 250px' }}>
          <h3>Filters</h3>
          <RefinementList attribute="brand" />
          <RangeInput attribute="price" />
          <RatingMenu attribute="rating" />
          <ToggleRefinement attribute="stock" label="In Stock Only" />
        </div>
        <div style={{ flex: 1 }}>
          <SearchBox />
          <SortBy
            defaultRefinement="mobile_device1"
            items={[
              { value: 'mobile_device1', label: 'Relevance' },
              { value: 'mobile_device1_price_asc', label: 'Price Low to High' },
              { value: 'mobile_device1_price_desc', label: 'Price High to Low' },
            ]}
          />
          <div className="product-grid">
            <Hits hitComponent={ProductCardAlgolia} />
          </div>
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default AlgoliaProductList;
