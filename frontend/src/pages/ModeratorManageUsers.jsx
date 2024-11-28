import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const ModeratorManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [moderator, setModerator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setModerator(parsedUser);

      if (!parsedUser.role.includes('MODERATOR')) {
        navigate('/'); // Redirect if the user is not a moderator
      } else {
        // Fetch users
        const fetchUsers = async () => {
          try {
            const response = await axiosInstance.get('/api/admin/users');
            const filteredUsers = response.data.data.filter((user) => user._id !== parsedUser.id);
            setUsers(filteredUsers);
          } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to load users. Please try again later.');
          } finally {
            setLoading(false);
          }
        };

        fetchUsers();
      }
    }
  }, [navigate]);

  const handleAction = async (userId, action) => {
    try {
      setLoading(true);
      // Perform the action (e.g., suspend, warn)
      const response = await axiosInstance.post('/api/moderator/user-action', { id: userId, action });

      if (response.data.success) {
        // Action was successful, refresh users
        const userListResponse = await axiosInstance.get('/api/admin/users');
        setUsers(userListResponse.data.data.filter(user => user._id !== moderator.id)); // Exclude self

        // Show success message
        setSuccessMessage(`Action '${action}' was successfully performed on the user.`);
      } else {
        // Handle failure response from the API
        setError(`Failed to perform the action: ${response.data.message}`);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error(`Error performing ${action} on user:`, error);
      setError('An error occurred while performing the action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header user={moderator} />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Moderator Dashboard</h1>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.email}</h2>
                  <p className="text-gray-600 mb-4">ID: {user._id}</p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleAction(user._id, 'WARNING')}
                      className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                    >
                      Issue Warning
                    </button>
                    <button
                      onClick={() => handleAction(user._id, 'SUSPENSION')}
                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                    >
                      Suspend User
                    </button>
                    <button
                      onClick={() => handleAction(user._id, 'BAN')}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      Ban User
                    </button>
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

export default ModeratorManageUsers;
