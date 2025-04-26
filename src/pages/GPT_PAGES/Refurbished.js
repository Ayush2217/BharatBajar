import React, { useState, lazy, Suspense, startTransition } from 'react';
import CommonPage from '../../pages/GPT_PAGES/Common_GPT_PAGES/CommonPage';
import '../../styles/Common.css';
import '../../styles/Refurbished.css';

const InputSection = lazy(() => import('../../pages/GPT_PAGES/Common_GPT_PAGES/InputSection'));
const CommonOutput = lazy(() => import('../../pages/GPT_PAGES/Common_GPT_PAGES/CommonOutput'));

const Refurbished = () => {
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const handleAskQuestion = () => {
        if (question.trim() === '') {
            setAnswer('Please enter a question or type of request so I can assist you.');
        } else {
            // Wrap this state update with startTransition to avoid blocking the UI
            startTransition(() => {
                setAnswer(`Answer from Summary of Changes
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
Now, the input section should Refurbished GPT for: "${question}"`);
                setQuestion(''); // Clear the input field after submitting
            });
        }
    };

    return (
        <CommonPage pageTitle="Refurbished" currentPage="Refurbished">
            <div className="gpt-device-comparison">
                <div className="gpt-device">
                    <h3>Device X (type your device name)</h3>
                    <div className="gpt-device-details">
                        <div className="gpt-device-info">
                            <p>Device</p>
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
                    <p>Add More Devices to compare</p>
                </div>
                <div className="gpt-device">
                    <h3>Device X (type your device name)</h3>
                    <div className="gpt-device-details">
                        <div className="gpt-device-info">
                            <p>Device</p>
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
                        placeholder="Ask E-GPT to help sell your device or buy a refurbished device"
                        question={question}
                        setQuestion={setQuestion}
                        handleAskQuestion={handleAskQuestion}
                    />
                </Suspense>
            </div>
        </CommonPage>
    );
};

export default Refurbished;
