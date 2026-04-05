import express from 'express';
import { login, register, verifyOtp, toRegister, toLogin } from '../controllers/userAuth.js';


const router = express.Router();

// GET Route
router.get('/register', toRegister);
router.get('/login', toLogin);


// POST route
router.post('/login', login);
router.post('/register', register);
router.post('/verfiy-otp', verifyOtp);

export default router;