import express from 'express';
import {studentSolution} from '../controllers/travelProblemController.js';

const router = express.Router();
router.get('/studentSolution', studentSolution);


export default router;