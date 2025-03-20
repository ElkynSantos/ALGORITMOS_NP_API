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