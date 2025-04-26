import React from 'react';
import AddressSearchBar from '../components/AddressSearchBar';
import MobilePopup from '../components/Popups/MobilePopup';
import IssuesPopup from '../components/Popups/IssuesPopup';
import TechnicianSlotPopup from '../components/Popups/TechnicianSlotPopup';
import ConfirmationPopup from '../components/Popups/ConfirmationPopup';
import '../styles/HomePage.css';

// Image imports
import RefurbishedImage from '../assets/Refurbished.jpeg';
import NewMobileImage from '../assets/NewMobile.jpeg';
import RepairImage from '../assets/Repair.png';
import GPTImage from '../assets/GPT.jpeg';
import TechnicianImage from '../assets/Technician.jpeg';
import learn from '../assets/learn.jpeg';
import DeviceSelection from '../components/Popups/DeviceSelection';

const clickableOptions = [
    { title: "Buy Refurbished Mobile Phones", image: RefurbishedImage, link: '/refurbished-mobile' },
    { title: "Buy Brand New Mobile Phone", image: NewMobileImage, link: '/new-mobile' },
    { title: "Get your device repaired", image: RepairImage, link: '/device-repair' },
    { title: "Talk with our GPT from start", image: GPTImage, link: '/gpt-chat' }, // Update the link
    { title: "Book a technician for general query", image: TechnicianImage, link: '/general-query' },
    { title: "Become a certified technician", image: learn, link: '/certified-technician' }
];

const HomePage = ({ username }) => {
    return (
        <div className="home-page">
            <AddressSearchBar />
            <div className="clickable-options-box">
                <h2>{username ? `What are you looking for, ${username}?` : 'What are you looking for?'}</h2>
                <div className="clickable-options">
                    {clickableOptions.map((option, index) => (
                        <a
                            key={index}
                            href={option.link}
                            className="option"
                        >
                            <img src={option.image} alt={option.title} />
                            <p>{option.title}</p>
                        </a>
                    ))}
                </div>
            </div>
            <MobilePopup />
            <DeviceSelection />
            <IssuesPopup />
            <TechnicianSlotPopup />
            <ConfirmationPopup />
        </div>
    );
}

export default HomePage;
