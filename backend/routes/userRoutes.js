import { Router } from 'express'; // Only import Router from express
import { getProfile } from '../controllers/userController.js'; // Add .js extension for ES Modules

const router = Router(); // Initialize the router

// Define the route for profile
router.get('/profile/:id', getProfile);


export default router; // Export the router
