import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Icon from './Icon';
import PrivacyPolicyPage from '../pages/privacy-policy/PrivacyPolicyPage';
import { NavLink } from 'react-router-dom';
import HomePage from '../pages/HomePage';

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
        <a href="/" className='flex flex-row space-x-2 items-center'>
          <Icon name='flipo' color='light' size={30}/>
          <div className='text-secondary font-semibold'>
            flipo flashcards
          </div>
        </a>
        <div className='space-x-8 font-semibold'>
          <NavLink to="/download">Download</NavLink>
          <NavLink to="/contribute">Contribute</NavLink>
          <NavLink to='/privacy-policy'>Privacy policy</NavLink>
        </div>
      </nav>
      <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contribute" />
            <Route path="/download" />
          </Routes>
      </div>
    </div>
  );
}

export default Header;