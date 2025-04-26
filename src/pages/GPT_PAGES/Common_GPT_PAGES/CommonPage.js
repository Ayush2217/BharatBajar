// CommonPage.js
import React, { lazy, Suspense } from 'react';
import Header from '../../../pages/GPT_PAGES/Common_GPT_PAGES/Header';
import '../../../styles/Common.css';

const Sidebar = lazy(() => import('../../../pages/GPT_PAGES/Common_GPT_PAGES/Sidebar'));
const AdsSection = lazy(() => import('../../../pages/GPT_PAGES/Common_GPT_PAGES/AdsSection'));

const CommonPage = ({ pageTitle, currentPage, children, inputSection }) => {
    return (
        <div className="common-page">
            <Header pageTitle={pageTitle} showExploreLinks={true} />
            <div className="common-container">
                <Suspense fallback={<div>Loading Sidebar...</div>}>
                    <Sidebar currentPage={currentPage} />
                </Suspense>
                <div className="main-content">
                    <div className="main-header">
                        <h2>{pageTitle}</h2>
                    </div>
                    {children}
                    {inputSection && (
                        <Suspense fallback={<div>Loading Input Section...</div>}>
                            {inputSection}
                        </Suspense>
                    )}
                </div>
                <Suspense fallback={<div>Loading Ads Section...</div>}>
                    <div className="ads-section-container">
                        <AdsSection />
                    </div>
                </Suspense>
            </div>
        </div>
    );
};

export default CommonPage;
