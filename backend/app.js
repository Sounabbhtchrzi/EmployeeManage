// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS to allow requests from your React frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your React frontend URL
    credentials: true, // Allow credentials like cookies
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Store your secret in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());
import './utils/passport.js'; // Passport configuration

// Flash messages middleware
app.use(flash());

// Middleware to set global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set up routes
app.use('/api', userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/auth',authRoutes);

// Catch-all route for undefined API endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
