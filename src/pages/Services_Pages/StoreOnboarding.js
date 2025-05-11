import React, { useState } from 'react';
import '../../styles/StoreOnboarding.css';
import StoreOnboardingForm from './StoreOnboardingForm';
import AddProductForm from './StoreOnboarding/AddProductForm';
import ProductCardStore from '../../components/Common/ProductCardStore';

const StoreOnboarding = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [listedProducts, setListedProducts] = useState([]);
  const [storeReady, setStoreReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleTabClick = (tabName) => {
    if (tabName === 'addProducts' && !onboardingComplete) {
      setModalMessage('⚠️ Please complete your store onboarding before adding products.');
      setShowModal(true);
    } else if (tabName === 'listedProducts' && listedProducts.length === 0) {
      setModalMessage('⚠️ You need to add products before viewing the listed products.');
      setShowModal(true);
    } else {
      setActiveTab(tabName);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'onboarding':
        return (
          <div>
            <h2>Store Onboarding</h2>
            <StoreOnboardingForm
              onComplete={() => {
                setOnboardingComplete(true);          // ✅ unlocks the tab
                setActiveTab('addProducts');          // ✅ switches to "Add Products" tab
              }}
            />
          </div>
        );

      case 'addProducts':
        return (
          <AddProductForm
            listedProducts={listedProducts}
            setListedProducts={setListedProducts}
          />
        );

      case 'listedProducts':
        return (
          <div style={{ padding: '20px', position: 'relative' }}>
            <h2>Listed Products</h2>

            {!storeReady && listedProducts.length > 0 && (
              <button
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'green',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setStoreReady(true);
                  alert('🎉 Store is now live and ready for customers!');
                }}
              >
                ✅ Ready to Board
              </button>
            )}

            {storeReady && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                ✅ Store is now live and visible to customers.
              </p>
            )}

            {listedProducts.length === 0 ? (
              <p>No products added yet.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {listedProducts.map((p, i) => (
                  <ProductCardStore key={i} product={p} isListedView={true} />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="store-onboarding-container">
      <div className="sidebar">
        <div
          className={`tab ${activeTab === 'onboarding' ? 'active' : ''}`}
          onClick={() => handleTabClick('onboarding')}
        >
          Store Onboarding
        </div>
        <div
          className={`tab ${activeTab === 'addProducts' ? 'active' : ''} ${!onboardingComplete ? 'disabled' : ''}`}
          onClick={() => handleTabClick('addProducts')}
        >
          Add Products
        </div>
        <div
          className={`tab ${activeTab === 'listedProducts' ? 'active' : ''} ${!listedProducts.length ? 'disabled' : ''}`}
          onClick={() => handleTabClick('listedProducts')}
        >
          Listed Products
        </div>
      </div>

      <div className="content">{renderContent()}</div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOnboarding;
