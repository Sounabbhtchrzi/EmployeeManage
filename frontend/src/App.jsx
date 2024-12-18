import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/ManageUsers";
import ModeratorManageUsers from "./pages/ModeratorManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/manage" element={<ManageUsers />} />
        <Route path="/moderate" element={<ModeratorManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
