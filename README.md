# EmployeeManage

**EmployeeManage** is a comprehensive role-based access system for managing employees, administrators, and moderators. The system ensures secure authentication, efficient role management, and a modern user interface to simplify employee-related tasks.

---

## Features

- **Role-Based Access Control (RBAC)**:
  - Assign and manage roles: Admin, Moderator, and Employee.
- **Authentication**:
  - Secure login using PassportJS with email and password.
- **Session Management**:
  - Persistent user sessions with MongoDB store integration.
- **Scalable Backend**:
  - Node.js and Express.js for building fast, reliable APIs.
- **Modern Frontend**:
  - React and Vite for a highly responsive and dynamic user interface.
- **Environment Variables**:
  - Secure sensitive configurations using `.env` files in both backend and frontend.
- **Key Features**:
  - Error handling with meaningful messages.
  - Role-specific actions and access levels.
  - Authentication using Passport.js
  - Session persistence

---

## Tech Stack

| **Category**        | **Technology**        |
|---------------------|-----------------------|
| Frontend            | React + Vite + Tailwind CSS |
| Backend             | Node.js + Express.js  |
| Database            | MongoDB              |
| Authentication      | PassportJS           |
| Environment Variables | `.env`             |

---

## Prerequisites

Ensure the following software is installed on your machine:

- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance)
- **Git**

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/your-username/EmployeeManage.git
cd EmployeeManage
```

### Setup backend
```bash
cd backend
npm install
npm start
``` 

### Setup frontend
```bash
cd frontend
npm install
npm run dev
```

### Create .env file in backend
```bash
MONOGO_URI= your_mongodb_connection
SESSION_SECRET= your_secret_key
PORT=5000
```

### Create .env file in frontend
```bash
BACKEND_URL=http://localhost:5000
```

### Run the application
#### Go to the Frontend URL(default: http://localhost:5173) to view it in action
