import express from 'express';
import { getAllUsers, getUserById, updateUserRole } from '../controllers/adminController.js';

const router = express.Router();

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/user/:id', getUserById);

// Update user role
router.post('/update-role', updateUserRole);

export default router;
