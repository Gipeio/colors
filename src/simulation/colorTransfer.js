// Fonction pour obtenir la couleur majoritaire d'un groupe
export function getMajorityColor(agents) {
  const colorCounts = {};
  agents.forEach(agent => {
    colorCounts[agent.color] = (colorCounts[agent.color] || 0) + 1;
  });
  
  let majorityColor = null;
  let maxCount = 0;
  
  for (const [color, count] of Object.entries(colorCounts)) {
    if (count > maxCount) {
      maxCount = count;
      majorityColor = color;
    }
  }
  
  return majorityColor;
}

// Fonction pour appliquer le transfert de couleur à un groupe
export function applyColorTransfer(groupAgents, majorityColor) {
  return groupAgents.map(agent => ({
    ...agent,
    color: majorityColor
  }));
}

// Fonction pour obtenir la distribution des couleurs
export function getColorDistribution(agents) {
  const distribution = {};
  agents.forEach(agent => {
    distribution[agent.color] = (distribution[agent.color] || 0) + 1;
  });
  return distribution;
}

// Fonction principale qui traite tous les groupes
export function processColorTransfer(groups, agents) {
  const newAgents = [...agents];
  
  groups.forEach(group => {
    const groupAgents = group.map(index => agents[index]);
    const majorityColor = getMajorityColor(groupAgents);
    const updatedGroup = applyColorTransfer(groupAgents, majorityColor);
    
    group.forEach((index, i) => {
      newAgents[index] = updatedGroup[i];
    });
  });
  
  return newAgents;
}