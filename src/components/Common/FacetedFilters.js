import React, { useEffect, useRef } from "react";
import { algoliasearch } from 'algoliasearch';
import instantsearch from "instantsearch.js";
import { refinementList, rangeSlider, menuSelect, clearRefinements } from "instantsearch.js/es/widgets";
import "instantsearch.css/themes/reset.css";
import "../../styles/FacetedFilters.css";

const FacetedFilters = () => {
  const filtersContainerRef = useRef(null);

  useEffect(() => {
    const searchClient = algoliasearch(
      "8MRLOZ7A26", // Your Algolia App ID
      "489c1269a1685a0990ecf6569113b29c" // Your Algolia API Key
    );

    if (filtersContainerRef.current) {
      const search = instantsearch({
        indexName: "mobile_device1", // Your Algolia Index Name
        searchClient,
      });

      search.addWidgets([
        // Clear refinements widget
        clearRefinements({
          container: filtersContainerRef.current.querySelector("#clear-filters"),
          templates: {
            resetLabel: "Clear All Filters",
          },
        }),

        // Brand refinement list
        refinementList({
          container: filtersContainerRef.current.querySelector("#brand-filter"),
          attribute: "brand",
          searchable: true,
          searchablePlaceholder: "Search brands...",
          templates: {
            header: "Brand",
          },
        }),

        // Price range slider
        rangeSlider({
          container: filtersContainerRef.current.querySelector("#price-filter"),
          attribute: "price",
          templates: {
            header: "Price Range",
          },
          tooltips: true,
        }),

        // Category menu select
        menuSelect({
          container: filtersContainerRef.current.querySelector("#category-filter"),
          attribute: "category",
          templates: {
            header: "Category",
          },
        }),

        // Rating refinement list
        refinementList({
          container: filtersContainerRef.current.querySelector("#rating-filter"),
          attribute: "rating",
          templates: {
            header: "Ratings",
          },
        }),
      ]);

      search.start();
    }
  }, []);

  return (
    <div className="filters-container" ref={filtersContainerRef}>
      <div id="clear-filters" className="filter-section"></div>
      <div id="brand-filter" className="filter-section"></div>
      <div id="price-filter" className="filter-section"></div>
      <div id="category-filter" className="filter-section"></div>
      <div id="rating-filter" className="filter-section"></div>
    </div>
  );
};

export default FacetedFilters;
