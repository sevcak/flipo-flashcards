import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Icon from './Icon';

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
          <a href="/download">Download</a>
          <a href="/contribute">Contribute</a>
          <a href="/privacy-policy">Privacy policy</a>
        </div>
      </nav>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" />
            <Route path="/privacy-policy" />
            <Route path="/contribute" />
            <Route path="/download" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Header;