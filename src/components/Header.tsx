import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className='flex flex-row justify-between py-4 px-6 border-b-black border-b-2'>
        <a href="/" className='logo-text'>flipo flashcards</a>
        <div className='space-x-8'>
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