import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Icon from './Icon';
import PrivacyPolicyPage from '../pages/privacy-policy/PrivacyPolicyPage';

const Header = () => {
  return (
    <div>
      <nav
        className='
          flex flex-row justify-between items-center
          py-4 px-6
          border-b-ui border-b-2
          text-ui
        '
      >
        <a href="./flipo-flashcards" className='flex flex-row space-x-2 items-center'>
          <Icon name='flipo' color='light' size={30}/>
          <div className='text-secondary font-semibold'>
            flipo flashcards
          </div>
        </a>
        <div className='space-x-8 font-semibold'>
          <a href="./flipo-flashcards/download">Download</a>
          <a href="./flipo-flashcards/contribute">Contribute</a>
          <a href="./flipo-flashcards/privacy-policy">Privacy policy</a>
        </div>
      </nav>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />}/>
            <Route path="/contribute" />
            <Route path="/download" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Header;