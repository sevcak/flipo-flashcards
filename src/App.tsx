import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;