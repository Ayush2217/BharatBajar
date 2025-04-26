// src/pages/Repair_Pages/Repair.js
import React, { useState } from 'react';
import IssuesPopup from '../../components/Popups/IssuesPopup';
import DeviceSelection from '../../components/Popups/DeviceSelection';
import SectionHeader from '../../components/Common/SectionHeader';
// Importing default images for categories and products
import NewMobileImage from '../../assets/NewMobile.jpeg';
import RefurbishedImage from '../../assets/Refurbished.jpeg';
import RepairImage from '../../assets/Repair.png';
import AudioImage from '../../assets/learn.jpeg';
const Repair = () => {
    const [isRepairPopupActive, setIsRepairPopupActive] = useState(false);
    const [selectedPhones, setSelectedPhones] = useState([]);
    const [isIssuesPopupActive, setIsIssuesPopupActive] = useState(false);
    const [selectedIssues, setSelectedIssues] = useState([]);
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherIssue, setOtherIssue] = useState('');

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
	const repairItems = [
        { title: 'Device Diagnostic Tool', description: 'Check your device health with our diagnostic tool.', image: RepairImage },
        { title: 'Screen Replacement', description: 'Replace broken screens with our repair services.', image: RefurbishedImage },
        { title: 'Protection Plan', description: 'Get a protection plan for your valuable devices.', image: NewMobileImage },
    ];
    const getImagePath = (imageName) => {
        try {
            return require(`../../assets/${imageName}`).default;
        } catch (error) {
            console.error(`Image not found: ${imageName}`);
            return '';
        }
    };

    const handleRepairPopup = (e) => {
        e.preventDefault();
        setIsRepairPopupActive(true);
        setSelectedPhones([]); // Clear selected phones
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
        setSelectedIssues([]); // Clear selected issues
    };

    const handleIssueCheckboxChange = (issue) => {
        const updatedIssues = selectedIssues.includes(issue)
            ? selectedIssues.filter(i => i !== issue)
            : [...selectedIssues, issue];
        setSelectedIssues(updatedIssues);
        if (issue === 'Others') setShowOtherInput(!showOtherInput);
    };

    return (
        <div className="repair-page">
            <h2>Repair Services</h2>
            <button onClick={handleRepairPopup}>Select Your Mobile Phone</button>

            <DeviceSelection
                isOpen={isRepairPopupActive}
                mobilePhones={mobilePhones}
                selectedPhones={selectedPhones}
                getImagePath={getImagePath}
                handleCheckboxChange={handleCheckboxChange}
                closePopup={() => setIsRepairPopupActive(false)}
                proceedToNext={openIssuesPopup}
            />

            <IssuesPopup
                isOpen={isIssuesPopupActive}
                issues={issues}
                selectedIssues={selectedIssues}
                handleIssueCheckboxChange={handleIssueCheckboxChange}
                closePopup={() => setIsIssuesPopupActive(false)}
                proceedToNext={() => {}} // Add further navigation or actions here
                showOtherInput={showOtherInput}
                setOtherIssue={setOtherIssue}
                otherIssue={otherIssue}
            /><ul>
                <li>
                    <h3>Screen Replacement</h3>
                    <p>We replace cracked or broken screens for all device models.</p>
                </li>
                <li>
                    <h3>Battery Replacement</h3>
                    <p>Extend your device's life with our professional battery replacement services.</p>
                </li>
                <li>
                    <h3>Water Damage Repair</h3>
                    <p>We can fix devices that have been damaged by water or other liquids.</p>
                </li>
                <li>
                    <h3>Software Troubleshooting</h3>
                    <p>Resolve software issues and improve device performance.</p>
                </li>
                {/* Add more services as needed */}
				{/* Repair & Protection Section */}
                    <SectionHeader title="Repair & Protection" subtitle="Get diagnostics, repairs, and protection plans for your devices." />
                    <div className="repair-protection-section">
                        {repairItems.map((item, index) => (
                            <div key={index} className="repair-card">
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <button className="action-button">Learn More</button>
                            </div>
                        ))}
                    </div>
        </ul>
        </div>
    );
};

export default Repair;
