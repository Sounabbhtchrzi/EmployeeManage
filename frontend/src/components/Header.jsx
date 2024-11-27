import React from 'react';
import Navbar from './Navbar'; 
import FlashMsg from './FlashMsg';

const Header = ({ user, messages }) => {
  return (
    <header className="bg-gray-100 shadow-md border-b-4 border-gray-800 ">
      <Navbar user={user} />
      <FlashMsg messages={messages} />
    </header>
  );
};

export default Header;
