import express from 'express';
import { login, register, verifyOtp, toRegister, toLogin, toVerify, test } from '../controllers/userAuth.js';
import { requireLogin } from '../middlewares/authMiddleware.js';


const router = express.Router();

// GET Route
router.get('/register', toRegister);
router.get('/login', toLogin);
router.get('/verify', toVerify);


// POST route
router.post('/login', requireLogin, login);
router.post('/register', register);
router.post('/verify', verifyOtp);
router.post('/test', test)

export default router; 