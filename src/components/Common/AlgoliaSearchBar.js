import React, { useEffect, useRef, useState } from "react";
import { liteClient } from 'algoliasearch/lite';
import instantsearch from "instantsearch.js";
import { searchBox, hits, configure } from "instantsearch.js/es/widgets";
import { useNavigate } from "react-router-dom";
import "instantsearch.css/themes/reset.css";
import "../../styles/AlgoliaSearchBar.css";
import fallbackImage from '../../assets/New_Logo.png'; // add a local image
const AlgoliaSearchBar = () => {
    const searchContainerRef = useRef(null);
    const hitsContainerRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const searchClient = liteClient(
            "8MRLOZ7A26", // Your Algolia App ID
            "489c1269a1685a0990ecf6569113b29c" // Your Algolia API Key
        );

        if (searchContainerRef.current && hitsContainerRef.current) {
            const searchInstance = instantsearch({
                indexName: "mobile_devices", // Your Algolia Index Name
                searchClient,
            });

            searchInstance.addWidgets([
                searchBox({
                    container: searchContainerRef.current,
                    placeholder: "Search for products or services...",
                    showReset: true,
                    showSubmit: true,
                    cssClasses: {
                        input: "search-input",
                        submit: "search-submit",
                        reset: "search-reset",
                    },
                    queryHook(query, refine) {
                        if (query.trim().length > 0) {
                            refine(query);

                            // Debug: Log Algolia search results
                            const index = searchClient.initIndex("mobile_device"); // Your Algolia Index Name
                            index.search(query).then(({ hits }) => {
                                console.log("Algolia hits:", hits);
                            });

                            setIsDropdownOpen(true); // Show dropdown
                        } else {
                            refine("");
                            setIsDropdownOpen(false); // Hide dropdown
                        }
                    },
                }),
                hits({
                    container: hitsContainerRef.current,
                    templates: {
                        empty: `<div class="no-results">No results found for "<strong>{{query}}</strong>"</div>`,
                        item: (hit) => `
                            <div 
                                class="search-suggestion" 
                                data-category="${encodeURIComponent(hit.category || "")}"
                                data-subcategory="${encodeURIComponent(hit.subcategory || "")}"
                                data-brand="${encodeURIComponent(hit.brand || "")}"
                            >
                                <img src={fallbackImage} alt="Product" />
                                <div class="suggestion-details">
                                    <p class="suggestion-title">${hit.name}</p>
                                    <p class="suggestion-brand">${hit.brand || "No brand"}</p>
                                </div>
                            </div>
                        `,
                    },
                }),
                configure({
                    hitsPerPage: 8,
                }),
            ]);

            searchInstance.start();
        }

        // Close dropdown on outside click
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target) &&
                hitsContainerRef.current &&
                !hitsContainerRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDropdownClick = (e) => {
        const suggestion = e.target.closest(".search-suggestion");
        if (suggestion) {
            const category = decodeURIComponent(suggestion.dataset.category || "");
            const subcategory = decodeURIComponent(suggestion.dataset.subcategory || "");
            const brand = decodeURIComponent(suggestion.dataset.brand || "");

            // Debug: Log values
            console.log("Selected Category:", category);
            console.log("Selected Subcategory:", subcategory);
            console.log("Selected Brand:", brand);

            if (category) {
                const encodedCategory = encodeURIComponent(category);
                const encodedSubcategory = subcategory ? encodeURIComponent(subcategory) : null;
                const encodedBrand = brand ? encodeURIComponent(brand) : null;

                if (encodedSubcategory) {
                    if (encodedBrand) {
                        navigate(`/category/${encodedCategory}/${encodedSubcategory}?brand=${encodedBrand}`);
                    } else {
                        navigate(`/category/${encodedCategory}/${encodedSubcategory}`);
                    }
                } else {
                    if (encodedBrand) {
                        navigate(`/category/${encodedCategory}?brand=${encodedBrand}`);
                    } else {
                        navigate(`/category/${encodedCategory}`);
                    }
                }
            } else {
                alert("Category or subcategory is missing in the search result. Please update the Algolia index.");
            }

            setIsDropdownOpen(false); // Close dropdown after redirection
        }
    };

    return (
        <div className="search-container">
            <div ref={searchContainerRef} id="searchbox" className="searchbox"></div>
            <div
                ref={hitsContainerRef}
                id="hits"
                className="search-dropdown"
                onClick={handleDropdownClick} // Add click handler
                style={{ display: isDropdownOpen ? "block" : "none" }} // Toggle display based on state
            ></div>
        </div>
    );
};

export default AlgoliaSearchBar;
