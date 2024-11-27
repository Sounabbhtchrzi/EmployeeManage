import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
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
              <Link to="/user/profile">Profile</Link>
            </li>
            {user.role === 'ADMIN' && (
              <li>
                <Link to="/admin/users">Manage Users</Link>
              </li>
            )}
            <li>
              <Link to="/logout">Logout</Link>
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
