import React, { useState, lazy, useEffect, Suspense } from 'react';
import Header from '../pages/GPT_PAGES/Common_GPT_PAGES/Header';
import '../styles/Common.css';
import '../styles/GPT_Header.css';

const Sidebar = lazy(() => import('../pages/GPT_PAGES/Common_GPT_PAGES/Sidebar'));
const InputSection = lazy(() => import('../pages/GPT_PAGES/Common_GPT_PAGES/InputSection'));
const AdsSection = lazy(() => import('../pages/GPT_PAGES/Common_GPT_PAGES/AdsSection'));
const CommonOutput = lazy(() => import('../pages/GPT_PAGES/Common_GPT_PAGES/CommonOutput')); // Import the new component

const GPT = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    
    const handleAskQuestion = () => {
        if (question.trim() === '') {
            setAnswer('Please enter a question or type of request so I can assist you.');
        } else {
            setAnswer(`Summary of Changes
CSS Updates:
Removed position: fixed from .unified-input-container so the input no longer stays fixed at the bottom of the viewport.
Adjusted margins and paddings to ensure a natural flow between output and input.
Component Ordering in GPT.js:
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Summary of Changes:
CSS Updates for Output Box:

Added max-width to ensure the output box doesn’t become too wide.
Implemented overflow-y: auto to allow scrolling for long responses.
Limited the height of the output box (max-height) so that it doesn’t grow too large and push the input field too far down.
Used word-wrap: break-word to prevent text overflow beyond the boundaries.
Component Handling:

CommonOutput component has been updated to use the newly styled .output-section.
Improved Input and Output Flow:

Output section dynamically resizes and provides scrolling for long answers, ensuring a clean user interface and better user experience.
Now, your output should always fit properly within the box without overflowing, and longer outputs should allow scrolling, keeping your input field always visible and usable.
Positioned the CommonOutput component above the InputSection in the JSX structure, ensuring that the output section appears before the input panel in the rendered layout.
Now, the input section should follow the output section naturally, making sure that the flow remains visually consistent and user-friendly, with the input always appearing beneath the output. The input section will no longer be fixed at the bottom of the viewport, allowing the user to scroll through longer outputs while the input remains at the bottom of the main content area.: "${question}"`);
            setQuestion(''); // Clear the input field after submitting
        }
    };

    return (
        <div className="common-page">
            <Header pageTitle="General" showExploreLinks={true} />
            <div className="common-container">
                <Suspense fallback={<div>Loading Sidebar...</div>}>
                    <Sidebar currentPage="General" />
                </Suspense>
                <div className="main-content">
                    <div className="main-header">
                        <h2>General Chat</h2>
                    </div>
                    <div className="gpt-chat-box">
                        <Suspense fallback={<div>Loading Output Section...</div>}>
                            <CommonOutput answer={answer} />
                        </Suspense>
                        <Suspense fallback={<div>Loading Input Section...</div>}>
                            <InputSection
                                placeholder="Message E-GPT"
                                question={question}
                                setQuestion={setQuestion}
                                handleAskQuestion={handleAskQuestion}
                            />
                        </Suspense>
                    </div>
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

export default GPT;
