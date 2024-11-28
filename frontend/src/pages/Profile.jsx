import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance'; 
import Header from '../components/Header'; 
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/profile/${id}`);
        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load profile.');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Unauthorized access. Please login.');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'An error occurred while fetching the profile.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            {error}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get the last action
  const lastAction = profile?.actions?.[profile.actions.length - 1];
  let actionColor = '';

  if (lastAction) {
    switch (lastAction) {
      case 'WARNING':
        actionColor = 'bg-yellow-200 text-yellow-700'; // Yellow for warning
        break;
      case 'SUSPENSION':
        actionColor = 'bg-orange-200 text-orange-700'; // Orange for suspension
        break;
      case 'BAN':
        actionColor = 'bg-red-200 text-red-700'; // Red for ban
        break;
      default:
        actionColor = 'bg-gray-200 text-gray-700'; // Default color
    }
  }

  return (
    <div>
      <Header user={user} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile?.avatar || '/avatar.png'} // Replace with actual avatar field or a default placeholder
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {profile?.role[0] === 'ADMIN' ? 'Admin' : 'User'} {profile?.name || ''}
            </h1>
          </div>
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-gray-500">{profile?.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="font-medium">Role:</p>
              <p className="text-gray-500">{profile?.role || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Employee ID:</p>
              <p className="text-gray-500">{id}</p>
            </div>
            <div>
              <p className="font-medium">Department:</p>
              <p className="text-gray-500">{profile?.role[0] === 'ADMIN' ? 'Management' : 'Development'}</p>
            </div>
            <div>
              <p className="font-medium">Date of Joining:</p>
              <p className="text-gray-500">11/9/2010</p>
            </div>

            {/* Display the last action with color theme */}
            {lastAction && (
              <div>
                <p className="font-medium">Action:</p>
                <div className={`p-4 mt-2 rounded-lg ${actionColor}`}>
                  <p>{lastAction}</p>
                </div>
              </div>
            )}
            {!lastAction && (
              <div>
                <p className="font-medium">Action:</p>
                <p className="text-gray-500">No actions recorded.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
