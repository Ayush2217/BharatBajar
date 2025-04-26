import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GPT from './pages/GPT';
import GptChatPage from './pages/GPT_PAGES/GptChatPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gpt" element={<GPT />} />
        <Route path="/gptchat" element={<GptChatPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
