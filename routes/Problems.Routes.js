import express from 'express';
import {studentSolutionTravelProblem, comunitySolutionTravelProblem} from '../controllers/travelProblemController.js';
import { studentKnapsackController, comunityKnapsackController } from '../controllers/kanpsackController.js';
import { studentHamiltonSolution, cominutyHamiltonSolution } from '../controllers/hamiltonProblemController.js';

const router = express.Router();
router.post('/studentSolutionTravelProblem', studentSolutionTravelProblem);
router.post('/comunitySolutionTravelProblem', comunitySolutionTravelProblem);
router.post('/studentHamiltonSolution', studentHamiltonSolution);
router.post('/comunityHamiltonSolution', cominutyHamiltonSolution);
router.post('/studentKnapsackSolution', studentKnapsackController);
router.post('/comunityKnapsackSolution', comunityKnapsackController);


export default router;