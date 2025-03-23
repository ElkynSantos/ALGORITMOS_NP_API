import Grafo from "./grafo/grafo.js";

export const calculateDistances = (locations) => {
  const earthRadio = 6371;
  const n = locations.length;
  const distances = Array.from({ length: n }, () => Array(n).fill(0));
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const dLat = toRadians(locations[j].lat - locations[i].lat);
        const dLng = toRadians(locations[j].lng - locations[i].lng);
        const lat1 = toRadians(locations[i].lat);
        const lat2 = toRadians(locations[j].lat);

        const haversineFormula =
          Math.sin(dLat / 2) ** 2 +
          Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
        const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

        distances[i][j] = parseFloat((earthRadio * centralAngle).toFixed(2));
      }
    }
  }
  return distances;
};

export const nearestNeighborAlgorithm = (distances) => {
  const n = distances.length;
  const visited = Array(n).fill(false);
  const route = [];
  let currentCity = 0;

  route.push(currentCity);
  visited[currentCity] = true;

  for (let i = 1; i < n; i++) {
    let nearestCity = -1;
    let minDistance = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && distances[currentCity][j] < minDistance) {
        nearestCity = j;
        minDistance = distances[currentCity][j];
      }
    }

    route.push(nearestCity);
    visited[nearestCity] = true;
    currentCity = nearestCity;
  }

  route.push(route[0]);
  return route;
};

export const cicloHamilton = (grafo, nodoInicio) => {
  //V = visitado
  //N = No visitado

  const nodos = grafo.getListaAdyacencia();
  const camino = [];

  const backtrack = (nodoActual) => {
    //console.log(nodoActual);
    camino.push(nodoActual);
    nodoActual.setEstado("V");

    if (camino.length === nodos.length) {
      if (nodoActual.getAdyacentes().some(n => n.label === camino[0].label)) {
        return true;
      }
    } else {
      for (let nodo of nodoActual.getAdyacentes()) {
        if (nodo.getEstado() === "N") {
          if (backtrack(nodo)) {
            return true;
          }
        }
      }
    }

    camino.pop();
    nodoActual.setEstado("N");
    return false;
  };


  if (backtrack(nodoInicio)) {
    console.log("Terminopt2");

    return camino;
  } else {
    console.log("Terminopt1");
    return null;
  }

};

export const comunityHamiltonSolution = (graph, path = []) => {

  if (path.length === Object.keys(graph).length) {
    if (graph[path[path.length - 1]].includes(path[0])) {
      return path;
    }
    return false;
  }

  for (const vertex of graph[path[path.length - 1]]) {
    if (!path.includes(vertex)) {
      const result = comunityHamiltonSolution(graph, [...path, vertex]);
      if (result) {
        return result;
      }
    }
  }

  return false;
};

export const studentKnpasack = (valores, pesos, pesoMax) => {
  const tam = pesos.length;
  const resultados = new Map();
  const camino = new Map();

  const knapsack = (i, sobras) => {
    if (i < 0 || sobras === 0) {
      return { value: 0, items: [] };
    }

    const key = `${i},${sobras}`;
    if (resultados.has(key)) {
      return resultados.get(key);
    }

    if (pesos[i] > sobras) {
      const result = knapsack(i - 1, sobras);
      resultados.set(key, result);
      camino.set(key, false);
      return result;
    }

    const sin = knapsack(i - 1, sobras);
    const con = knapsack(i - 1, sobras - pesos[i]);
    con.value += valores[i];
    con.items = [...con.items, i];

    const bestOption = con.value > sin.value ? con : sin;

    resultados.set(key, bestOption);
    camino.set(key, bestOption === con);
    return bestOption;
  }

  return knapsack(tam - 1, pesoMax);
}

export const comunityKnapasack = (W, val, wt) => {
  let dp = new Array(W + 1).fill(0);
  let selected = new Array(W + 1).fill().map(() => []);

  for (let i = 1; i <= wt.length; i++) {
    for (let j = W; j >= wt[i - 1]; j--) {
      if (dp[j] < dp[j - wt[i - 1]] + val[i - 1]) {
        dp[j] = dp[j - wt[i - 1]] + val[i - 1];
        selected[j] = [...selected[j - wt[i - 1]], i - 1];
      }
    }
  }

  let maxValue = dp[W];
  let selectedItems = selected[W].map(index => ({ value: val[index], weight: wt[index] }));

  return { maxValue, selectedItems };
}
