import React, { useState, lazy, Suspense, startTransition } from 'react';
import CommonPage from '../../pages/GPT_PAGES/Common_GPT_PAGES/CommonPage';
import '../../styles/GPT_Header.css';

const InputSection = lazy(() => import('../../pages/GPT_PAGES/Common_GPT_PAGES/InputSection'));
const CommonOutput = lazy(() => import('../../pages/GPT_PAGES/Common_GPT_PAGES/CommonOutput'));

const Diagnostics = () => {
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const handleAskQuestion = () => {
        if (question.trim() === '') {
            setAnswer('Please enter a question or type of request so I can assist you.');
        } else {
            // Wrap this state update with startTransition to avoid blocking the UI
            startTransition(() => {
                setAnswer(`Answer from Diagnostics GPT for: "${question}"`);
                setQuestion(''); // Clear the input field after submitting
            });
        }
    };

    return (
        <CommonPage pageTitle="Diagnostics" currentPage="Diagnostics">
            <div className="gpt-device-comparison">
                <div className="gpt-device">
                    <h3>Device X (Type your device name)</h3>
                    <div className="gpt-device-details">
                        <div className="gpt-device-info">
                            <p>Device Type</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Manufacturer</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Series</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Model</p>
                        </div>
                    </div>
                </div>
                <div className="gpt-add-more">
                    <p>Get more Devices Diagnosed</p>
                </div>
                <div className="gpt-device">
                    <h3>Device X (Type your device name)</h3>
                    <div className="gpt-device-details">
                        <div className="gpt-device-info">
                            <p>Device Type</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Manufacturer</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Series</p>
                        </div>
                        <div className="gpt-device-info">
                            <p>Model</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Box - Includes Output Section and Input Section */}
            <div className="gpt-chat-box">
                <Suspense fallback={<div>Loading Output Section...</div>}>
                    <CommonOutput answer={answer} />
                </Suspense>

                <Suspense fallback={<div>Loading Input Section...</div>}>
                    <InputSection
                        placeholder="Ask E-GPT to help diagnose your device"
                        question={question}
                        setQuestion={setQuestion}
                        handleAskQuestion={handleAskQuestion}
                    />
                </Suspense>
            </div>
        </CommonPage>
    );
};

export default Diagnostics;
