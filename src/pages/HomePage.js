import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import RepairModal from '../components/modals/RepairModal';
import MobilePopup from '../components/Popups/MobilePopup';
import IssuesPopup from '../components/Popups/IssuesPopup';
import TechnicianSlotPopup from '../components/Popups/TechnicianSlotPopup';
import ConfirmationPopup from '../components/Popups/ConfirmationPopup';
import DeviceSelection from '../components/Popups/DeviceSelection';
import { Link } from 'react-router-dom';

// Image imports
import image1 from '../assets/Kirana_Store.png';
import image2 from '../assets/Traditional_Market.png';
import image3 from '../assets/Saree_Store.png';
import image4 from '../assets/Gneral_Stores.png';
import image5 from '../assets/Electronics_Store.png';
import RefurbishedImage from '../assets/Refurbished.jpeg';
import NearByStores from '../assets/IndianStores.png';
import RepairImage from '../assets/Repair.png';
import GPTImage from '../assets/GPT.jpeg';
import TechnicianImage from '../assets/Technician.jpeg';
import learn from '../assets/learn.jpeg';

const images = [
  `url(${image1})`,
  `url(${image2})`,
  `url(${image3})`,
  `url(${image4})`,
  `url(${image5})`
];

const clickableOptions = [
  { title: "Buy Refurbished Mobile Phones", image: RefurbishedImage, link: '/refurbished-mobile' },
  { title: "Buy Brand New Mobile Phone", image: NearByStores, link: '/new-mobile' },
  { title: "Get your device repaired", image: RepairImage, link: '/device-repair' },
  { title: "Talk with our GPT from start", image: GPTImage, link: '/gpt' },
  { title: "Book a technician for general query", image: TechnicianImage, link: '/general-query' },
  { title: "Become a certified technician", image: learn, link: '/certified-technician' }
];

// Define missing arrays for mobile phones, issues, and technician slots
const mobilePhones = [
  { name: "iPhone 13 Pro Max", image: "iphone13promax.jpeg" },
  { name: "Samsung Galaxy S21", image: "galaxys21.png" },
  { name: "Google Pixel 6", image: "pixel6.png" },
  { name: "OnePlus 9 Pro", image: "oneplus9pro.png" },
  { name: "Sony Xperia 1 III", image: "xperia1iii.png" }
];

const issues = [
  "Screen Damage",
  "Battery Issue",
  "Camera Malfunction",
  "Speaker Problem",
  "Overheating",
  "Software Issue"
];

const technicianSlots = [
  { date: '2024-06-05', time: '10:00 AM - 11:00 AM' },
  { date: '2024-06-05', time: '11:00 AM - 12:00 PM' },
  { date: '2024-06-05', time: '01:00 PM - 02:00 PM' },
  { date: '2024-06-05', time: '02:00 PM - 03:00 PM' }
];

const HomePage = () => {
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBuyMobilePopupActive, setIsBuyMobilePopupActive] = useState(false);
  const [isRepairPopupActive, setIsRepairPopupActive] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [isIssuesPopupActive, setIsIssuesPopupActive] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherIssue, setOtherIssue] = useState('');
  const [isTechnicianSlotPopupActive, setIsTechnicianSlotPopupActive] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isConfirmationPopupActive, setIsConfirmationPopupActive] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getImagePath = (imageName) => {
    try {
      return require(`../${imageName}`).default;
    } catch (error) {
      console.error(`Image not found: ${imageName}`);
      return '';
    }
  };
  const storeNames = [
	"Ravi Kirana Store",
	"Sharma Fresh Fruits",
	"Joshi Saree House",
	"Annapurna Fresh Mart",
	"Gupta Electronics",
	"Mehta Home Needs",
	"Sethi Fresh Vegitables",
	"Varnasi Sarees",
	"Bharat Bazaar"
  ];
  const toggleRepairModal = () => {
    setIsRepairModalOpen(!isRepairModalOpen);
  };

  const handlePopup = (title) => {
  switch (title) {
    case "Buy Brand New Mobile Phone":
      setIsBuyMobilePopupActive(true);
      break;
    case "Get your device repaired":
      setIsRepairPopupActive(true);
      break;
    case "Book a technician for general query":
      setIsTechnicianSlotPopupActive(true);
      break;
    case "Talk with our GPT from start":
      // If you want to navigate to another page directly
      window.location.href = '/gpt';
      break;
    default:
      console.warn("Unknown popup request:", title);
  }
};


  const handleIssueCheckboxChange = (issue) => {
    const updatedIssues = selectedIssues.includes(issue)
      ? selectedIssues.filter(i => i !== issue)
      : [...selectedIssues, issue];
    setSelectedIssues(updatedIssues);
    if (issue === 'Others') setShowOtherInput(!showOtherInput);
  };

  const openTechnicianSlotPopup = () => {
    setIsTechnicianSlotPopupActive(true);
  };

  const handleSlotCheckboxChange = (slot) => {
    const updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter(s => s !== slot)
      : [...selectedSlots, slot];
    setSelectedSlots(updatedSlots);
  };

  const openConfirmationPopup = () => {
    setIsConfirmationPopupActive(true);
  };

  const handleConfirmBooking = () => {
    alert("Booking confirmed!");
    setIsConfirmationPopupActive(false);
  };

  const handleCheckboxChange = (phoneName) => {
    setSelectedPhones((prevSelected) =>
      prevSelected.includes(phoneName)
        ? prevSelected.filter((name) => name !== phoneName)
        : [...prevSelected, phoneName]
    );
  };

  const openIssuesPopup = () => {
    setIsRepairPopupActive(false);
    setIsIssuesPopupActive(true);
    setSelectedIssues([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="StyledHomePage">
      <RepairModal isOpen={isRepairModalOpen} onClose={toggleRepairModal} />

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Swagat Hai! Apni Dukaan, Apne Sheher Mein</h1>
        <p>From kirana to electronics — discover local gems, support neighborhood stores, and shape the future of Indian retail</p>
		<button className="cta-button" onClick={() => window.location.href = '/salespage'}>
             Explore Sales 
        </button>
         <button className="cta-button secondary" onClick={() => window.location.href = '/community'}>
             Explore Community
         </button>
		 <button className="cta-button" onClick={() => window.location.href = '/gpt'}>
             Explore RM-GPT
         </button>
      </div>

      {/* Image Slider */}
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              backgroundImage: image,
              display: currentIndex === index ? 'block' : 'none'
            }}
          ></div>
        ))}
        <button
          className="arrow arrow--left"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
        >
          &#10094;
        </button>
        <button
          className="arrow arrow--right"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
        >
          &#10095;
        </button>
        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${currentIndex === index ? 'indicator--active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="Near-By-Stores-Section">
  <h2>Nearby Stores</h2>
  <div className="Near-By-Stores-scroll">
    {[...Array(9).keys()].map((i) => (
      <div key={i} className="product-card">
        <div
          className="store-image"
          style={{
            backgroundImage: images[i % images.length],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '200px',
            borderRadius: '8px'
          }}
        />
        <p>{storeNames[i]}</p>
      </div>
    ))}
  </div>
</div>

      {/* Clickable Options */}
      
    </div>
  );
}

export default HomePage;
