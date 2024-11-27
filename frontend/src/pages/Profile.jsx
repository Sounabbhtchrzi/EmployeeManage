import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance';  // or use fetch, depending on your choice for making API calls
import Header from '../components/Header'; // Assuming Header is in the components directory

const Profile = () => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch person data from the backend
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axiosInstance.get('/api/person');  // Replace with your backend API endpoint
        setPerson(response.data); // Assuming response.data contains the person object
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, []);

  // Show loading or error messages while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Include Header component */}
      <Header />

      <h1>
        <span
          className="goback"
          onClick={() => window.history.back()}
        >
          ←
        </span>
        Profile
      </h1>

      <div className="profile">
        <div>
          <p className="title">ID</p>
          <p className="subtitle">{person.id}</p>
        </div>
        <div>
          <p className="title">Email/username</p>
          <p className="subtitle">{person.email}</p>
        </div>
        <div>
          <p className="title">Role</p>
          <p className="subtitle">{person.role}</p>
        </div>
        <div>
          <p className="title">User object</p>
          <pre className="subtitle">{JSON.stringify(person, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;
