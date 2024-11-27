import React from "react";
import Header from "../components/Header"; // Adjust the path based on your project structure

const Home = () => {
  return (
    <div>
      {/* Header Component */}
        <Header />
     
      {/* Main Section with Background Image */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/homeng.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Welcome to the Employee Management System
            </h1>
            <p className="text-xl mb-6">
              A complete solution to manage employees with role-based access
              control, authentication, and more!
            </p>
            <a
              href="/register"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-lg font-semibold rounded-md transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Feature List Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Express JS</h3>
              <p>
                Build powerful backend APIs using Express JS framework, ensuring
                fast and scalable applications.
              </p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Role-Based Access Control
              </h3>
              <p>
                Implement role-based access to manage different users like
                admin, moderator, and clients.
              </p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                PassportJS Authentication
              </h3>
              <p>
                Secure user authentication using PassportJS with email and
                password for login.
              </p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Session Persistence</h3>
              <p>
                Use Express sessions to persist login status even after server
                reboot, with MongoDB store integration.
              </p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Flash Messages</h3>
              <p>
                Display flash messages for feedback to users after successful
                actions or errors.
              </p>
            </div>
            <div className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Error Handling</h3>
              <p>
                Gracefully handle errors like 404 pages and provide meaningful
                messages to users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-800 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-6">
            Create an account and start managing your employees efficiently with
            our easy-to-use system.
          </p>
          <a
            href="/register"
            className="px-8 py-4 bg-blue-500 hover:bg-blue-700 text-lg font-semibold rounded-md transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Employee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
