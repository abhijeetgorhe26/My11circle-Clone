import express from 'express';
import { upcomingDashBoard, completeDashBoard, liveDashboard } from "../controllers/dashBoardController.js";
import { requireLogin } from '../middlewares/authMiddleware.js';
const router = express.Router();


console.log('yes dashboard routing working')

router.get('/upcomingDashboard', requireLogin, upcomingDashBoard);
router.get('/completeDashBoard', requireLogin, completeDashBoard);
router.get('/liveDashBoard', requireLogin, liveDashboard);


export default router;