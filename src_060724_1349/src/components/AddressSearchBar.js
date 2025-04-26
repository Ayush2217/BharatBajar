import React, { useState } from 'react';
import '../styles/AddressSearchBar.css';
import addressIcon from '../assets/address_icon.png';
import dropdownIcon from '../assets/dropdown-icon.png';
import searchIcon from '../assets/search-icon.png';

const AddressSearchBar = () => {
  const [address, setAddress] = useState('Delhi');
  const [details, setDetails] = useState('25, Shivaji Marg, Block A1, Janakp...');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Implement search functionality here
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className="address-container" onClick={toggleDropdown}>
          <img src={addressIcon} alt="Address" className="address-icon" />
          <div className="address-details">
            <div className="address">{address}</div>
            <div className="details">{details}</div>
          </div>
          <img
            src={dropdownIcon}
            alt="Dropdown"
            className="dropdown-icon"
          />
        </div>
        <div className="divider"></div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
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
                type="text"
                placeholder="Search for your location"
                className="dropdown-search-input"
              />
              <img src={searchIcon} alt="Search" className="dropdown-search-icon" />
            </div>
            <div className="dropdown-item">Noida</div>
            <div className="dropdown-item">Greater Noida</div>
            <div className="dropdown-item">Delhi</div>
            <div className="dropdown-item">Gurugram</div>
            <div className="dropdown-item">Ghaziabad</div>
            <div className="dropdown-item">Faridabad</div>
            <div className="dropdown-item">Lucknow</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearchBar;
