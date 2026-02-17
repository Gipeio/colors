import { getGroups } from './groups';
import { processColorTransfer } from './colorTransfer';

/**
 * Déplace un agent aléatoirement dans les 4 directions
 * @param {Object} agent - L'agent à déplacer
 * @param {number} width - Largeur de la grille
 * @param {number} height - Hauteur de la grille
 * @returns {Object} - Agent avec nouvelles coordonnées
 */
function moveAgent(agent, width, height) {
  const directions = [
    { dx: 0, dy: -1 }, // haut
    { dx: 1, dy: 0 },  // droite
    { dx: 0, dy: 1 },  // bas
    { dx: -1, dy: 0 }  // gauche
  ];
  
  const dir = directions[Math.floor(Math.random() * directions.length)];
  
  let newX = agent.x + dir.dx;
  let newY = agent.y + dir.dy;
  
  // NOUVEAU COMPORTEMENT: Rester dans les limites (pas de traversée)
  // Si on sort, on reste sur place
  if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
    return { ...agent }; // Retourne l'agent à sa position originale
  }
  
  return {
    ...agent,
    x: newX,
    y: newY
  };
}

/**
 * Résout les collisions en gardant un seul agent par cellule
 * @param {Array} agents - Liste des agents après déplacement
 * @returns {Array} - Liste des agents sans collisions
 */
function resolveCollisions(agents) {
  const positionMap = new Map();
  const uniqueAgents = [];
  
  // Garder seulement le premier agent pour chaque position
  agents.forEach(agent => {
    const key = `${agent.x},${agent.y}`;
    if (!positionMap.has(key)) {
      positionMap.set(key, agent);
      uniqueAgents.push(agent);
    }
  });
  
  return uniqueAgents;
}

/**
 * Exécute un tick complet de simulation
 * @param {Array} agents - Liste des agents
 * @param {number} width - Largeur de la grille
 * @param {number} height - Hauteur de la grille
 * @returns {Array} - Nouvelle liste d'agents
 */
export function tickAgents(agents, width, height) {
  if (!agents || agents.length === 0) return [];
  
  // 1. Déplacement
  const movedAgents = agents.map(agent => moveAgent(agent, width, height));
  
  // 2. Résolution des collisions
  const agentsWithoutCollisions = resolveCollisions(movedAgents);
  
  // 3. Détection des groupes
  const groups = getGroups(agentsWithoutCollisions, width, height);
  
  // 4. Transfert de couleur
  const finalAgents = processColorTransfer(groups, agentsWithoutCollisions);
  
  return finalAgents;
}