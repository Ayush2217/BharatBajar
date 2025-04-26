import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import '../styles/AddressSearchBar.css';
import addressIcon from '../assets/address_icon.png';
import dropdownIcon from '../assets/dropdown-icon.png';
import searchIcon from '../assets/search-icon.png';


const AddressSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Delhi');
  const [details, setDetails] = useState('');

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // optional: search handler
  };

  const handleSelect = ({ description }) => {
    setValue(description, false);
    clearSuggestions();
    setSelectedAddress(description);
    setDropdownOpen(false);

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log('Selected Location:', { description, lat, lng });
      setDetails(results[0]?.formatted_address || '');
      // Save to localStorage if needed
    });
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.address-container') && !e.target.closest('.dropdown-menu')) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="outer-block">
      <div className="address-search-bar">
        <div className="address-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={addressIcon} alt="Address" className="address-icon" />
          <div className="address-details">
            <div className="address">{selectedAddress}</div>
            <div className="details">{details || 'Click to change location'}</div>
          </div>
          <img src={dropdownIcon} alt="Dropdown" className="dropdown-icon" />
        </div>

        <div className="divider"></div>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="        Search for Services"
          />
          <button type="submit" className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
        </form>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search for your location"
                className="dropdown-search-input"
              />
              <img src={searchIcon} alt="Search" className="dropdown-search-icon" />
            </div>

            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <div
                  key={place_id}
                  className="dropdown-item"
                  onClick={() => handleSelect({ description })}
                >
                  {description}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
