import React, { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import "../../styles/Header.css";

const LocationSelector = ({ setLocation, closeDropdown }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();
    const short = description.split(",")[0];
    setLocation({ short });
    closeDropdown();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyANCubMNUmqqqSkoMaLEHDCnP29XLQ_2uU`
          );
          const data = await res.json();

          if (data.status === "OK" && data.results.length > 0) {
            const result = data.results.find((r) =>
              r.types.includes("locality")
            ) || data.results[0];

            const cityComp = result.address_components.find((comp) =>
              comp.types.includes("locality")
            );

            const city = cityComp?.long_name || "Unknown";
            setValue("");
            setLocation({ short: city });
            closeDropdown();
          } else {
            setErrorMsg("Unable to fetch address.");
          }
        } catch (err) {
          console.error("Location error:", err);
          setErrorMsg("Could not retrieve location.");
        }
      },
      (err) => {
        console.warn("Permission error:", err);
        if (err.code === 1) {
          alert("Please allow location access to detect your city.");
        }
      }
    );
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const short = value.split(",")[0];
    setLocation({ short });
    clearSuggestions();
    closeDropdown();
  };

  return (
    <div className="location-dropdown" onClick={(e) => e.stopPropagation()}>
      <button className="detect-location-button" onClick={handleDetectLocation}>
        📍 Detect My Location
      </button>
      <form onSubmit={handleManualSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search or type your location"
          className="location-input"
          disabled={!ready}
        />
      </form>
      {status === "OK" && (
        <ul className="location-list">
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
      {errorMsg && (
        <div className="detected-location-box" style={{
          marginTop: "10px",
          border: "1px solid red",
          padding: "8px",
          backgroundColor: "#fff5f5",
          borderRadius: "4px",
          color: "#b10000"
        }}>
          ⚠️ {errorMsg}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
