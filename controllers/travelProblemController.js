import { calculateDistances, nearestNeighborAlgorithm } from "../utils.js";

export const studentSolution = (req, res) => {
    const cities = req.body.cities;
    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ mensaje: 'El arreglo de ciudades es inválido o está vacío' });
    }
    const distances = calculateDistances(cities);
    const route = nearestNeighborAlgorithm(distances);
    res.json({ route: route });
};
  
export const comunitySolution = (req, res) => {
const { descripcion } = req.body;
res.json({ mensaje: `Problema de viaje creado: ${descripcion}` });
};
  