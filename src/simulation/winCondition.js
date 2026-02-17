/**
 * Vérifie si une couleur a gagné (tous les agents de la même couleur)
 * @param {Object} colorDistribution - Distribution des couleurs { color: count }
 * @returns {boolean} - true si une seule couleur présente
 */
export function hasWinner(colorDistribution) {
  const colors = Object.keys(colorDistribution);
  return colors.length === 1;
}

/**
 * Retourne la couleur gagnante s'il y en a une
 * @param {Object} colorDistribution - Distribution des couleurs
 * @returns {string|null} - La couleur gagnante ou null
 */
export function getWinner(colorDistribution) {
  if (hasWinner(colorDistribution)) {
    return Object.keys(colorDistribution)[0];
  }
  return null;
}

/**
 * Vérifie si la simulation est terminée
 * @param {Array} agents - Liste des agents
 * @returns {boolean} - true si fin de simulation
 */
export function isSimulationComplete(agents) {
  if (!agents || agents.length === 0) return false;
  
  const firstColor = agents[0].color;
  return agents.every(agent => agent.color === firstColor);
}