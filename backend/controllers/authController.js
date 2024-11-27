import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import passport from 'passport';

// Login Controller
export const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: { id: user._id, email: user.email, role: user.role },
      });
    });
  })(req, res, next);
};

// Register Controller
export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;
    const doesExist = await User.findOne({ email });
    if (doesExist) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const user = new User(req.body);
    await user.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// Logout Controller
export const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
};
