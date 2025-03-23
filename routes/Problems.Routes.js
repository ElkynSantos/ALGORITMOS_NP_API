import express from 'express';
import {studentSolution} from '../controllers/travelProblemController.js';
import { studentHamiltonSolution, cominutyHamiltonSolution } from '../controllers/hamiltonProblemController.js';
import { studentKnapsackController, comunityKnapsackController } from '../controllers/kanpsackController.js';

const router = express.Router();
router.get('/studentSolution', studentSolution);
router.post('/studentHamiltonSolution', studentHamiltonSolution);
router.post('/comunityHamiltonSolution', cominutyHamiltonSolution);
router.post('/studentKnapsackSolution', studentKnapsackController);
router.post('/comunityKnapsackSolution', comunityKnapsackController);


export default router;