import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainHomePage from './pages/MainHomePage';
import CommunityPage from './pages/CommunityPage';
import CommunityVideosPage from './pages/Community_Videos_Pages/CommunityVideosPage';
import DiscussionPage from './pages/Community_Discussion_Pages/DiscussionPage';
import NewDiscussionPopup from './pages/Community_Discussion_Pages/NewDiscussionPopup';
import HomePage from './pages/HomePage';
import GPT from './pages/GPT';
import Sales from './pages/GPT_PAGES/Sales';
import StoreDetailsPage from './pages/Services_Pages/StoreDetailsPage';
import Diagnostics from './pages/GPT_PAGES/Diagnostics';
import Warranty from './pages/GPT_PAGES/Warranty';
import Training from './pages/GPT_PAGES/Training';
import Learning from './pages/GPT_PAGES/Learning';
import Refurbished from './pages/GPT_PAGES/Refurbished';
import Repair from './pages/Services_Pages/Repair';
import SalesPage from './pages/Services_Pages/Sales';
import StoresPage from './pages/Services_Pages/StoresPage';
import Resale from './pages/Services_Pages/Resale';
import WarrantyPage from './pages/Services_Pages/Warranty';
import TrainingPage from './pages/Services_Pages/Training';
import LearningPage from './pages/Services_Pages/Learning';
import ProductDetailPage from './pages/Services_Pages/ProductDetailsPage';
import ProductListPage from './pages/Services_Pages/ProductListPage';
import CartPage from './pages/Services_Pages/CartPage';
import WishlistPage from './pages/Services_Pages/WishlistPage';
import SaveForLaterPage from './pages/Services_Pages/SaveForLaterPage';
import CheckoutPage from './pages/Services_Pages/CheckoutPage';
import OrderConfirmation from './pages/Services_Pages/OrderConfirmation';
import OrderHistoryPage from './pages/Services_Pages/OrderHistoryPage';
import UserAccountPage from './pages/Services_Pages/UserAccountPage';
import OrderTrackingPage from './pages/Services_Pages/OrderTrackingPage';
import ReturnExchangePage from './pages/Services_Pages/ReturnExchangePage';
import CancelOrderPage from './pages/Services_Pages/CancelOrderPage';
import ShoppingListsPage from './pages/Services_Pages/ShoppingListsPage';
import ProductReviewsPage from './pages/Services_Pages/ProductReviewsPage';
import OffersPage from './pages/Services_Pages/OffersPage';
import AI from './pages/Research_Pages/AI';
import Blockchain from './pages/Research_Pages/Blockchain';
import Sustainability from './pages/Research_Pages/Sustainability';
import Support from './pages/ContactUS_Pages/Support';
import ContactSales from './pages/ContactUS_Pages/ContactSales';
import Feedback from './pages/ContactUS_Pages/Feedback';
import Team from './pages/AboutUS_Pages/Team';
import Careers from './pages/AboutUS_Pages/Careers';
import Mission from './pages/AboutUS_Pages/Mission';
import { CartProvider } from './contexts/CartContext';
import SearchResultsPage from './pages/Services_Pages/SearchResultsPage';
import isWebView from './utils/isWebView';


function App() {
    return (
        <Router>
            <div id="root">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<MainHomePage />} />
                        <Route path="/explore" element={<HomePage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/community-videos" element={<CommunityVideosPage />} />
                        <Route path="/gpt" element={<GPT />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/diagnostics" element={<Diagnostics />} />
                        <Route path="/warranty" element={<Warranty />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/refurbished" element={<Refurbished />} />
                        <Route path="/salespage" element={<SalesPage />} />
						<Route path="/stores" element={<StoresPage />} /> 
                        <Route path="/store/:storeName" element={<CartProvider><StoreDetailsPage /></CartProvider>} />
                        <Route path="/repair" element={<Repair />} />
                        <Route path="/refurbishedpage" element={<Resale />} />
                        <Route path="/warrantypage" element={<WarrantyPage />} />
                        <Route path="/trainingpage" element={<TrainingPage />} />
                        <Route path="/learningpage" element={<LearningPage />} />
						<Route path="/search-results" element={<SearchResultsPage />} />

                        {/* Pages requiring Cart Context */}
                        <Route path="/category/:categoryName/:subcategoryName" element={<CartProvider><ProductListPage /></CartProvider>} />
                        <Route path="/product-details/:productName" element={<CartProvider><ProductDetailPage /></CartProvider>} />
                        <Route path="/wishlist" element={<CartProvider><WishlistPage /></CartProvider>} />
                        <Route path="/save-for-later" element={<CartProvider><SaveForLaterPage /></CartProvider>} />
                        <Route path="/cart" element={<CartProvider><CartPage /></CartProvider>} />
						<Route path="/store/:storeId" element={<CartProvider><StoreDetailsPage /></CartProvider>} />
                        <Route path="/checkout" element={<CartProvider><CheckoutPage /></CartProvider>} />
                        <Route path="/order-confirmation" element={<CartProvider><OrderConfirmation /></CartProvider>} />
						<Route path="/order-history" element={<CartProvider><OrderHistoryPage /></CartProvider>} />
                        <Route path="/order-tracking/:orderId" element={<CartProvider><OrderTrackingPage /></CartProvider>} />
                        <Route path="/return-exchange/:orderId" element={<CartProvider><ReturnExchangePage /></CartProvider>} />
                        <Route path="/cancel-order" element={<CartProvider><CancelOrderPage /></CartProvider>} />
                        <Route path="/shopping-lists" element={<CartProvider><ShoppingListsPage /></CartProvider>} />
                        <Route path="/product-reviews/:productId" element={<CartProvider><ProductReviewsPage /></CartProvider>} />
                        <Route path="/offers" element={<CartProvider><OffersPage /></CartProvider>} />

                        {/* General Pages */}
                        <Route path="/account" element={<UserAccountPage />} />
                        <Route path="/ai" element={<AI />} />
                        <Route path="/blockchain" element={<Blockchain />} />
                        <Route path="/sustainability" element={<Sustainability />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/contactsales" element={<ContactSales />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/mission" element={<Mission />} />
                        <Route path="/new-discussion" element={<NewDiscussionPopup />} />
                        <Route path="/discussion/:title" element={<DiscussionPage />} />
                    </Routes>
                </main>
                {!isWebView() && <Footer />}
            </div>
        </Router>
    );
}

export default App;
