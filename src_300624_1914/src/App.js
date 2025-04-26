import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RepairModal from './components/modals/RepairModal';
import AddressSearchBar from './components/AddressSearchBar';
import MobilePopup from './components/Popups/MobilePopup';
import IssuesPopup from './components/Popups/IssuesPopup';
import TechnicianSlotPopup from './components/Popups/TechnicianSlotPopup';
import ConfirmationPopup from './components/Popups/ConfirmationPopup';
import './styles/App.css';
import AuthModal from './components/auth/AuthModal';
import GptChatPage from './pages/GptChatPage';

// Image imports
import image1 from './assets/FIRST.png';
import image2 from './assets/SECOND.png';
import image3 from './assets/THIRD.png';
import RefurbishedImage from './assets/Refurbished.jpeg';
import NewMobileImage from './assets/NewMobile.jpeg';
import RepairImage from './assets/Repair.png';
import GPTImage from './assets/GPT.jpeg';
import TechnicianImage from './assets/Technician.jpeg';
import learn from './assets/learn.jpeg';
import DeviceSelection from './components/Popups/DeviceSelection';

const images = [
  `url(${image1})`,
  `url(${image2})`,
  `url(${image3})`
];

const clickableOptions = [
    { title: "Buy Refurbished Mobile Phones", image: RefurbishedImage, link: '/refurbished-mobile' },
    { title: "Buy Brand New Mobile Phone", image: NewMobileImage, link: '/new-mobile' },
    { title: "Get your device repaired", image: RepairImage, link: '/device-repair' },
    { title: "Talk with our GPT from start", image: GPTImage, link: '/gpt-chat' }, // Update the link
    { title: "Book a technician for general query", image: TechnicianImage, link: '/general-query' },
    { title: "Become a certified technician", image: learn, link: '/certified-technician' }
];

const mobilePhones = [
  { name: "iPhone 13 Pro Max", image: "iphone13promax.jpeg" },
  { name: "Samsung Galaxy S21", image: "galaxys21.png" },
  { name: "Google Pixel 6", image: "pixel6.png" },
  { name: "OnePlus 9 Pro", image: "oneplus9pro.png" },
  { name: "Sony Xperia 1 III", image: "xperia1iii.png" },
  { name: "Xiaomi Mi 11 Ultra", image: "mi11ultra.png" },
  { name: "Oppo Find X3 Pro", image: "findx3pro.png" },
  { name: "Huawei P40 Pro", image: "p40pro.png" },
  { name: "Asus ROG Phone 5", image: "rogphone5.png" },
  { name: "Nokia 8.3 5G", image: "nokia83.png" },
  { name: "iPhone 12", image: "iphone12.png" },
  { name: "Samsung Galaxy Note 20", image: "galaxynote20.png" },
  { name: "Google Pixel 5", image: "pixel5.png" },
  { name: "OnePlus 8T", image: "oneplus8t.png" },
  { name: "Sony Xperia 5 II", image: "xperia5ii.png" },
  { name: "Xiaomi Mi 10", image: "mi10.png" },
  { name: "Oppo Reno 5 Pro", image: "reno5pro.png" },
  { name: "Huawei P30 Pro", image: "p30pro.png" },
  { name: "Asus ZenFone 7", image: "zenfone7.png" },
  { name: "Nokia 7.2", image: "nokia72.png" }
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
  { date: '2024-06-05', time: '02:00 PM - 03:00 PM' },
  { date: '2024-06-06', time: '10:00 AM - 11:00 AM' },
  { date: '2024-06-06', time: '11:00 AM - 12:00 PM' },
  { date: '2024-06-06', time: '01:00 PM - 02:00 PM' },
  { date: '2024-06-06', time: '02:00 PM - 03:00 PM' }
];

function App() {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this line
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Add this line
  };

  // Define getImagePath inside the App component
  const getImagePath = (imageName) => {
    try {
      return require(`./${imageName}`).default;
    } catch (error) {
      console.error(`Image not found: ${imageName}`);
      return '';
    }
  };

  const toggleRepairModal = () => {
    console.log('Current modal state:', isRepairModalOpen);
    setIsRepairModalOpen(!isRepairModalOpen);
    console.log('New modal state after toggle:', !isRepairModalOpen);
  };

  const handleBuyMobilePopup = (e) => {
    e.preventDefault();
    setIsBuyMobilePopupActive(true);
    setSelectedPhones([]); // Clear selected phones
  };

  const handleRepairPopup = (e) => {
    e.preventDefault();
    console.log("Repair popup should open now.");
    setIsRepairPopupActive(true);
    setSelectedPhones([]); // Clear selected phones
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
    setIsConfirmationPopupActive(false); // You might want to reset other states here as well.
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
    // Additional logout logic if needed
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true); // Add this line
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="AppContainer">
        <Header 
          onRepairClick={toggleRepairModal} 
          onLogout={handleLogout} 
          username={username} // Pass username to Header
          isLoggedIn={isLoggedIn} // Pass isLoggedIn to Header
        />
        <RepairModal isOpen={isRepairModalOpen} onClose={toggleRepairModal} />
        <main className="Content">
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
          <AddressSearchBar />
          <div className="clickable-options-box">
            <h2>{username ? `What are you looking for, ${username}?` : 'What are you looking for?'}</h2>
            <div className="clickable-options">
              {clickableOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.link}
                  className="option"
                  onClick={option.title === "Buy Brand New Mobile Phone" ? handleBuyMobilePopup : option.title === "Get your device repaired" ? handleRepairPopup : null}
                >
                  <img src={option.image} alt={option.title} />
                  <p>{option.title}</p>
                </a>
              ))}
            </div>
          </div>
          <MobilePopup isOpen={isBuyMobilePopupActive} mobilePhones={mobilePhones} closePopup={() => setIsBuyMobilePopupActive(false)} getImagePath={getImagePath} />
          <DeviceSelection isOpen={isRepairPopupActive} mobilePhones={mobilePhones} selectedPhones={selectedPhones} getImagePath={getImagePath} handleCheckboxChange={handleCheckboxChange} closePopup={() => setIsRepairPopupActive(false)} proceedToNext={openIssuesPopup} />
          <IssuesPopup isOpen={isIssuesPopupActive} issues={issues} selectedIssues={selectedIssues} handleIssueCheckboxChange={handleIssueCheckboxChange} closePopup={() => setIsIssuesPopupActive(false)} proceedToNext={openTechnicianSlotPopup} showOtherInput={showOtherInput} setOtherIssue={setOtherIssue} otherIssue={otherIssue} />
          <TechnicianSlotPopup isOpen={isTechnicianSlotPopupActive} technicianSlots={technicianSlots} selectedSlots={selectedSlots} handleSlotCheckboxChange={handleSlotCheckboxChange} closePopup={() => setIsTechnicianSlotPopupActive(false)} proceedToNext={openConfirmationPopup} />
          <ConfirmationPopup isOpen={isConfirmationPopupActive} selectedPhones={selectedPhones} selectedIssues={selectedIssues} selectedSlots={selectedSlots} closePopup={() => setIsConfirmationPopupActive(false)} confirmBooking={handleConfirmBooking} setIsTechnicianSlotPopupActive={setIsTechnicianSlotPopupActive} setIsConfirmationPopupActive={setIsConfirmationPopupActive} />
          <Routes>
            <Route path="/" element={<HomePage />} />
			<Route path="/gpt-chat" element={<GptChatPage />} /> {/* New Route */}
          </Routes>
        </main>
        <Footer />
        <AuthModal 
          isOpen={isModalOpen} 
          onClose={toggleModal} 
          setIsLoggedIn={setIsLoggedIn} 
          setUsername={setUsername} 
        />
      </div>
    </Router>
  );
}

export default App;
