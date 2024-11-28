import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import moderatorRoutes from './routes/moderatorRoutes.js';
import "./utils/passport.js"


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
    origin: process.env.FRONTEND_URL,
    credentials: true,
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
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
    },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());



// Set up routes
app.use('/api', userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/moderator',moderatorRoutes);

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
