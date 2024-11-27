import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance'; 
import Header from '../components/Header'; // Assuming Header is in the components directory
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log(id);
        const response = await axiosInstance.get(`/api/profile/${id}`);
        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load profile.');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('You are not authorized. Please login.');
          //navigate('/login'); // Redirect to login if unauthorized.
        } else {
          setError(
            error.response?.data?.message || 'An error occurred while fetching profile.'
          );
        }
      }finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Show loading or error messages while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
    <Header user={user} />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {profile?.name || 'User'}!
        </h1>
        <div className="text-gray-700">
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>
          <p>
            <strong>Role:</strong> {profile?.role || 'N/A'}
          </p>
          <p>
            <strong>ID:</strong> {id}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
