import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => { 
  const id=user?.id;
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); 
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold">EmployeeManage</h2>
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={`/profile/${id}`}>Profile</Link>
            </li>
            {user.role.includes('ADMIN') && (
              <li>
                <Link to="/manage">Manage Users</Link>
              </li>
            )}
            {user.role.includes('MODERATOR') && (
              <li>
                <Link to="/moderate">Manage Users</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
