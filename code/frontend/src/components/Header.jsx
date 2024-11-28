import React from 'react';
import { Link } from 'react-router-dom';
import BB from '../components/BackButton';
const Header = () => {
  return (
    <div>
      <BB />
      <div className="bg-blue-100 h-8 flex items-center justify-center">
        <h1 className="bg-green-300 font-bold py-2 px-4 rounded mb-4">EXTRA NEWS WEBSITE</h1>
      </div>
    </div>
  );
};

export default Header;