import React from 'react';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch-dom';
import searchClient from '../../contexts/algoliaConfig';
import '../../styles/SearchResults.css';

const Hit = ({ hit }) => (
    <div className="search-hit">
        <img src={hit.image_uri} alt={hit.title} className="hit-image" />
        <div className="hit-content">
            <h4>{hit.title}</h4>
            <p>{hit.description}</p>
            <p><strong>Price:</strong> ${hit.price}</p>
            <p><strong>Stock:</strong> {hit.stock_state}</p>
        </div>
    </div>
);

const SearchResultsPage = () => {
    return (
        <InstantSearch searchClient={searchClient} indexName="your_index_name">
            <div className="search-container">
                <SearchBox />
                <div className="search-results">
                    <Hits hitComponent={Hit} />
                </div>
                <Pagination />
            </div>
        </InstantSearch>
    );
};

export default SearchResultsPage;
