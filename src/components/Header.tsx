import React from 'react';
import Icon from './Icon';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
      <div className='backdrop-blur-lg fixed w-full'>
        <nav
          className='
            flex flex-row justify-between items-center
            py-4 px-6
            border-b-ui border-b-2
            text-ui
            bg-primary/70 backdrop-opacity-30
          '
        >
          <NavLink to="/" className='flex flex-row space-x-2 items-center'>
            <Icon name='flipo' color='light' size={30}/>
            <div className='text-secondary font-semibold'>
              flipo flashcards
            </div>
          </NavLink>
          <div className='space-x-8 font-semibold'>
            <NavLink to="/download">Download</NavLink>
            <NavLink to="/contribute">Contribute</NavLink>
            <NavLink to='/privacy-policy'>Privacy policy</NavLink>
          </div>
        </nav>
      </div>
  );
}

export default Header;