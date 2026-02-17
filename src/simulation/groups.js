/**
 * Détecte les groupes connectés (4-connectivité) par DFS
 * @param {Array} agents - Liste des agents
 * @param {number} width - Largeur de la grille
 * @param {number} height - Hauteur de la grille
 * @returns {Array} - Liste des groupes (chaque groupe est un tableau d'indices)
 */
export function getGroups(agents, width, height) {
  const visited = new Array(agents.length).fill(false);
  const groups = [];
  
  // Créer une map des positions pour recherche rapide
  const positionMap = new Map();
  agents.forEach((agent, index) => {
    positionMap.set(`${agent.x},${agent.y}`, index);
  });
  
  function dfs(index, group) {
    visited[index] = true;
    group.push(index);
    
    const agent = agents[index];
    const neighbors = [
      [agent.x, agent.y - 1], // haut
      [agent.x + 1, agent.y], // droite
      [agent.x, agent.y + 1], // bas
      [agent.x - 1, agent.y]  // gauche
    ];
    
    neighbors.forEach(([nx, ny]) => {
      // Gestion des bords (effet torique)
      if (nx < 0) nx = width - 1;
      if (nx >= width) nx = 0;
      if (ny < 0) ny = height - 1;
      if (ny >= height) ny = 0;
      
      const neighborIndex = positionMap.get(`${nx},${ny}`);
      if (neighborIndex !== undefined && !visited[neighborIndex]) {
        dfs(neighborIndex, group);
      }
    });
  }
  
  agents.forEach((_, index) => {
    if (!visited[index]) {
      const group = [];
      dfs(index, group);
      groups.push(group);
    }
  });
  
  return groups;
}