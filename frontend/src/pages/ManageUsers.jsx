import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userActive, setUserActive] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUserActive(parsedUser);

      if (!parsedUser.role.includes('ADMIN') ) {
        navigate("/"); // Redirect to unauthorized page if user is not an admin
      } else {
        // Fetch users from the API when the component mounts
        const fetchUsers = async () => {
          try {
            const response = await axiosInstance.get('/api/admin/users');
            const filteredUsers = response.data.data.filter(user => user._id !== parsedUser.id);
            setUsers(filteredUsers); // Set filtered users // Ensure response is an array
            setLoading(false); // Set loading to false after fetching users
           
          } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false); // Stop loading even if there's an error
          }
        };

        fetchUsers();
      }
    }
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      console.log(userId);
      await axiosInstance.post('/api/admin/update-role', { id: userId, role: newRole });
      // Optionally refresh users after the role update
      const response = await axiosInstance.get('/api/admin/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show loading message with spinner while data is being fetched
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header user={userActive} />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Manage Users</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.email}</h2>
                  <p className="text-gray-600 mb-4">ID: {user._id}</p>

                  <div className="mb-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRoleChange(user._id, e.target.role.value);
                      }}
                      className="flex items-center space-x-4"
                    >
                      <select
                        name="role"
                        defaultValue={user.role[0]}
                        className="p-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="MODERATOR">Moderator</option>
                        <option value="CLIENT">Client</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Update Role
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">No users found</div>
          )}
        </div>
      </div>

      <footer className="bg-gray-200 py-4 mt-8">
        {/* Include your footer component here */}
      </footer>
    </div>
  );
};

export default ManageUsers;
