import Grafo from "./grafo/grafo.js";

export const calculateDistances = (locations) => {
  const earthRadio = 6371;
  const n = locations.length;
  const distances = Array.from({ length: n }, () => Array(n).fill(0));
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const dLat = toRadians(locations[j].latitude - locations[i].latitude);
        const dLng = toRadians(locations[j].longitude - locations[i].longitude);
        const lat1 = toRadians(locations[i].latitude);
        const lat2 = toRadians(locations[j].latitude);

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
  let totalCost = 0;

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
    totalCost += minDistance;
    currentCity = nearestCity;
  }

  totalCost += distances[currentCity][route[0]];
  route.push(route[0]);

  return { route, totalCost };
};

export const algoritmoHeldKarp = (distances) => {
  const n = distances.length;
  const memo = Array.from({ length: n }, () => Array(1 << n).fill(Infinity));
  const parent = Array.from({ length: n }, () => Array(1 << n).fill(-1));
  memo[0][1] = 0;

  for (let mask = 1; mask < (1 << n); mask += 2) {
    for (let u = 1; u < n; u++) {
      if (mask & (1 << u)) {
        for (let v = 0; v < n; v++) {
          if (mask & (1 << v) && v !== u) {
            const newCost = memo[v][mask ^ (1 << u)] + distances[v][u];
            if (newCost < memo[u][mask]) {
              memo[u][mask] = newCost;
              parent[u][mask] = v;
            }
          }
        }
      }
    }
  }

  let minCost = Infinity;
  let lastCity = -1;
  const finalMask = (1 << n) - 1;

  for (let u = 1; u < n; u++) {
    const cost = memo[u][finalMask] + distances[u][0];
    if (cost < minCost) {
      minCost = cost;
      lastCity = u;
    }
  }
  return {totalCost: minCost, route: reconstructPath(parent, finalMask, lastCity)};
};


function reconstructPath(parent, finalMask, lastCity) {
  const path = [];
  let mask = finalMask;
  let currentCity = lastCity;

  while (currentCity !== -1) {
    path.push(currentCity);
    const nextCity = parent[currentCity][mask];
    mask ^= (1 << currentCity);
    currentCity = nextCity;
  }
  console.log(path);
  path.reverse();
  path.push(0);
  return path;
}

export const cicloHamilton = (grafo, nodoInicio) => {
  // V = visitado
  // N = No visitado

  const nodos = grafo.getListaAdyacencia();
  const camino = [];

  const backtrack = (nodoActual) => {
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

export const studentKnapsack = (items, pesoMax) => {
  const tam = items.length;
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

    if (items[i].weight > sobras) {
      const result = knapsack(i - 1, sobras);
      resultados.set(key, result);
      camino.set(key, false);
      return result;
    }

    const sin = { ...knapsack(i - 1, sobras) };
    const con = { ...knapsack(i - 1, sobras - items[i].weight) }; 
    con.value += items[i].value;
    con.items = [...con.items, items[i].key]; 

    const bestOption = con.value > sin.value ? con : sin;

    resultados.set(key, bestOption);
    camino.set(key, bestOption === con);
    return bestOption;
  };

  return knapsack(tam - 1, pesoMax);
};


export const comunityKnapasack = (items, pesoMax) => {
  let dp = new Array(pesoMax + 1).fill(0);
  let selected = new Array(pesoMax + 1).fill().map(() => []);

  for (let i = 1; i <= items.length; i++) {
    for (let j = pesoMax; j >= items[i - 1].weight; j--) {
      if (dp[j] < dp[j - items[i - 1].weight] + items[i - 1].value) {
        dp[j] = dp[j - items[i - 1].weight] + items[i - 1].value;
        selected[j] = [...selected[j - items[i - 1].weight], items[i - 1].key];
      }
    }
  }

  let maxValue = dp[pesoMax];
  items = selected[pesoMax].map(key => {
    return key;
  });

  return { value:maxValue, items };
};