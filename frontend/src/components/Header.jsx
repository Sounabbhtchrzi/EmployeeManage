import React from 'react';
import Navbar from './Navbar'; 

const Header = ({ user }) => {
  
  return (
    <header className="bg-gray-100 shadow-md border-b-4 border-gray-800 ">
      <Navbar user={user} />
    </header>
  );
};

export default Header;
