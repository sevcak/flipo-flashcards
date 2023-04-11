import React from 'react';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ContributePage from './pages/contribute/ContributePage';
import DownloadPage from './pages/download/DownloadPage';
import PrivacyPolicyPage from './pages/privacy-policy/PrivacyPolicyPage';

function App(): JSX.Element {
  return (
    <div className='text-secondary'>
      <Header />
      <div className='pt-10'>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/download" element={<DownloadPage />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;