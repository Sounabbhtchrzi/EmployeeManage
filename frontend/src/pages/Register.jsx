import React, { useState } from "react";
import axiosInstance from "../../utils/AxiosInstance"; // Adjust the path to your axiosInstance file
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handles form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = [];
    if (!formData.email) errors.push("Email is required.");
    if (!formData.password) errors.push("Password is required.");
    if (formData.password !== formData.password2) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      setIsSubmitting(true); // Set submitting state to true

      try {
        const response = await axiosInstance.post("api/auth/register", formData);
        if (response.data.success) {
          alert("Registration successful!");
          // Redirect to login page or another flow
          navigate('/profile');
        } else {
          setErrorMessages([response.data.message || "Registration failed."]);
        }
      } catch (error) {
        setErrorMessages([
          error.response?.data?.message || "An error occurred during registration.",
        ]);
      } finally {
        setIsSubmitting(false); // Reset submitting state after request
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="w-full text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Register</h1>
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
  
      {/* Registration Form */}
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
  
      {/* Login Redirect */}
      <div className="w-full max-w-md mx-auto text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span>
            <a href="/auth/login" className="text-indigo-600 hover:text-indigo-700">
              Login
            </a>
          </span>
        </p>
      </div>
  
      {/* Footer Section */}
      <footer className="w-full text-center py-4 bg-gray-800 text-white mt-auto">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
