import { algoritmoHeldKarp, calculateDistances, nearestNeighborAlgorithm } from "../utils.js";

export const studentSolutionTravelProblem = (req, res) => {
    const cities = req.body.directions;
    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ mensaje: 'El arreglo de ciudades es inválido o está vacío' });
    }


    const distances = calculateDistances(cities);
    const start = performance.now();
    const {route, totalCost} = nearestNeighborAlgorithm(distances);
    const end = performance.now();
    res.json({ route:route, totalCost, time: end - start });
};
  
export const comunitySolutionTravelProblem = (req, res) => {
  const cities = req.body.directions;
  if (!Array.isArray(cities) || cities.length === 0) {
    return res.status(400).json({ mensaje: 'El arreglo de ciudades es inválido o está vacío' });
  }
  const distances = calculateDistances(cities);
  const start = performance.now();
  const {route, totalCost} = algoritmoHeldKarp(distances,cities);
  const end = performance.now();;
  res.json({ route, totalCost, time: end - start });
};
  