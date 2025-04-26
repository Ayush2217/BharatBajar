import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import AlgoliaSearchBar from "./Common/AlgoliaSearchBar";
import LocationSelector from "./Common/LocationSelector";
import "../styles/Header.css";
import searchIcon from "../assets/New_Logo.png";
import AuthModal from "./auth/AuthModal";

const Header = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("..."); // Default to loading
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsLoggedIn(true);
      const firstName = storedUsername.split(" ")[0];
      setUsername(firstName);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".location-container") &&
        !e.target.closest(".location-dropdown")
      ) {
        setDropdownOpen("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // Auto-detect city on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyANCubMNUmqqqSkoMaLEHDCnP29XLQ_2uU`
            );
            const data = await response.json();
            if (data.status === "OK") {
              const result = data.results.find((r) =>
                r.types.includes("locality")
              ) || data.results[0];

              const cityComponent = result.address_components.find((comp) =>
                comp.types.includes("locality")
              );

              const city = cityComponent?.long_name || "Unknown";
              setLocation(city);
            }
          } catch (err) {
            console.error("City detection error:", err);
          }
        },
        (error) => {
          console.warn("User denied location access:", error);
          // Do not show alert here to avoid spam
        }
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    alert("User logged out");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(menu);
  };

  const closeDropdownWithDelay = () => {
    setTimeout(() => {
      setDropdownOpen("");
    }, 200);
  };

  const getFormattedLocation = (loc) => {
    return loc.length > 0 ? loc.toUpperCase().slice(0, 8) : "LOC";
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={searchIcon} alt="Logo" className="header-logo" />
        </Link>
        <div
          className="location-container"
          onClick={() =>
            setDropdownOpen(dropdownOpen === "location" ? "" : "location")
          }
        >
          <FaMapMarkerAlt className="location-icon" />
          <span className="location-label">DELIVER TO</span>
          <span className="location-value">{getFormattedLocation(location)}</span>
          <FaCaretDown className="dropdown-icon" />
          {dropdownOpen === "location" && (
            <div>
              <LocationSelector
                setLocation={({ short }) => {
                  setLocation(short);
                }}
                closeDropdown={() => setDropdownOpen("")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="header-search">
        <AlgoliaSearchBar />
      </div>

      <nav className="nav-container">
        {["services", "research", "contact", "orders"].map((menu) => (
          <div
            key={menu}
            className="nav-item"
            onMouseEnter={() => toggleDropdown(menu)}
            onMouseLeave={closeDropdownWithDelay}
          >
            <span>{menu.toUpperCase()}</span>
            {dropdownOpen === menu && (
              <ul
                className="dropdown"
                onMouseEnter={() => toggleDropdown(menu)}
                onMouseLeave={closeDropdownWithDelay}
              >
                {menu === "services" && (
                  <>
                    <li><Link to="/salespage">SALES</Link></li>
                    <li><Link to="/stores">STORE</Link></li>
                    <li><Link to="/refurbishedpage">RESALE</Link></li>
                    <li><Link to="/warrantypage">WARRANTY</Link></li>
                    <li><Link to="/trainingpage">TRAINING</Link></li>
                    <li><Link to="/learningpage">LEARNING</Link></li>
                  </>
                )}
                {menu === "research" && (
                  <>
                    <li><Link to="/ai">AI</Link></li>
                    <li><Link to="/blockchain">BLOCKCHAIN</Link></li>
                    <li><Link to="/sustainability">SUSTAINABILITY</Link></li>
                  </>
                )}
                {menu === "contact" && (
                  <>
                    <li><Link to="/support">SUPPORT</Link></li>
                    <li><Link to="/contactsales">SALES</Link></li>
                    <li><Link to="/feedback">FEEDBACK</Link></li>
                  </>
                )}
                {menu === "orders" && (
                  <>
                    <li><Link to="/order-history">YOUR ORDERS</Link></li>
                    <li><Link to="/cart">CART</Link></li>
                    <li><Link to="/wishlist">WISHLIST</Link></li>
                    <li><Link to="/shopping-lists">SHOPPING LISTS</Link></li>
                  </>
                )}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="header-right">
        <Link to="/cart" className="cart-container">
          <FaShoppingCart /> CART
        </Link>
        {isLoggedIn ? (
          <div className="account-actions">
            <span className="welcome-message">
              HELLO, {username.toUpperCase()}
            </span>
            <button className="logout-button" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={toggleModal}>
            LOGIN
          </button>
        )}
      </div>
      <AuthModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={(fullName) => {
          const firstName = fullName.split(" ")[0];
          setUsername(firstName);
          localStorage.setItem("username", firstName);
        }}
      />
    </header>
  );
};

export default Header;
