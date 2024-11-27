import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.email) errors.push("Email is required.");
    if (!formData.password) errors.push("Password is required.");

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);

      try {
        const response = await axiosInstance.post("/auth/login", formData);
        if (response.data.success) {
          alert("Registration successful!");
          // Redirect to login page or another flow
          window.location.href = "/auth/login";
        } else {
          setErrorMessages([response.data.message || "Registration failed."]);
        }
      } catch (error) {
        setErrorMessages([
          error.response?.data?.message || "An error occurred during registration.",
        ]);
      }
    }

    // Perform login logic here (e.g., API call, form validation)
    // On success, redirect or update state accordingly
    // On failure, set error messages
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="w-full text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
      </header>
  
      {/* Display Flash/Error Messages */}
      {errorMessages.length > 0 && (
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <ul className="list-disc pl-5">
              {errorMessages.map((message, index) => (
                <li key={index} className="text-sm">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
  
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email/Username
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value="Login"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </form>
  
      {/* Register Redirect */}
      <div className="w-full max-w-md mx-auto text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <span>
            <a href="/register" className="text-indigo-600 hover:text-indigo-700">
              Register
            </a>
          </span>
        </p>
      </div>
  
      {/* Footer Section */}
      <footer className="w-full text-center mt-8 py-4 bg-gray-800 text-white">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
  
};

export default Login;
