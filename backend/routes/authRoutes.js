import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { ensureLoggedOut, ensureLoggedIn } from 'connect-ensure-login';


const router = Router();

// Login Route
router.post('/login', ensureLoggedOut({ redirectTo: '/' }), loginUser);

// Register Route
router.post('/register', ensureLoggedOut({ redirectTo: '/' }), registerUser);

// Logout Route
router.post('/logout', ensureLoggedIn({ redirectTo: '/' }), logoutUser);

export default router;
