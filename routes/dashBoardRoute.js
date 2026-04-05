import express from 'express';
import { upcomingDashBoard, completeDashBoard, liveDashboard } from "../controllers/dashBoardController.js";

const router = express.Router();


console.log('yes dashboard routing working')

router.get('/upcomingDashboard', upcomingDashBoard);
router.get('/completeDashBoard', completeDashBoard);
router.get('/liveDashBoard', liveDashboard);


export default router;