import express from 'express';
import { login, register, verifyOtp, toRegister, toLogin, toVerify, test } from '../controllers/userAuth.js';


const router = express.Router();

// GET Route
router.get('/register', toRegister);
router.get('/verify', toVerify);
router.get('/logout', (req, res) => { // Fixed order: req first, then res
    res.redirect('/login'); // Fixed spelling
});


// POST route
router.post('/login', login);
router.post('/register', register);
router.post('/verify', verifyOtp);
router.post('/test', test);



export default router; 