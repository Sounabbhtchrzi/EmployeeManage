import { Router } from 'express'; 
import { getProfile } from '../controllers/userController.js'; 

const router = Router(); 

// Define the route for profile
router.get('/profile/:id', getProfile);


export default router; 
