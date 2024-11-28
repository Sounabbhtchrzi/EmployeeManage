import express from 'express';
import { addActionToUser } from '../controllers/moderatorController.js';

const router=express.Router();

router.post('/user-action',addActionToUser);

export default router;