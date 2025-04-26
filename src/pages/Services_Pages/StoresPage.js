import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/StoresPage.css';
import SectionHeader from '../../components/Common/SectionHeader';
import SalesHeader from '../../components/Common/SalesHeader';

const StoresPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://192.168.0.141:8000/api/stores/');
                setStores(response.data.stores || []);
            } catch (err) {
                console.error('Error fetching stores:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);
    const handleViewChange = (newView) => {
        if (newView === 'stores') {
            navigate('/stores');
        } else {
            navigate('/salespage');
        }
    };
    const handleStoreClick = (storeName) => {
        navigate(`/store/${encodeURIComponent(storeName)}`, { state: { storeName } });
    };

    if (loading) {
        return <div className="loading-message">Loading stores...</div>;
    }

    return (
        <div className="stores-page">
            <SalesHeader onViewChange={handleViewChange} />
            <SectionHeader title="Explore Local Stores Near You" />
            <div className="stores-container">
                {stores.length > 0 ? (
                    stores.map((store, index) => (
                        <div
                            key={index}
                            className="store-card"
                            onClick={() => handleStoreClick(store)}
                        >
                            <h3>{store}</h3>
                        </div>
                    ))
                ) : (
                    <p>No stores available.</p>
                )}
            </div>
        </div>
    );
};

export default StoresPage;
