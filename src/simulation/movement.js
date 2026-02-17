import { getGroups } from './groups';
import { processColorTransfer } from './colorTransfer';

/**
 * Déplace un agent avec gestion des collisions
 */
function moveAgent(agent, width, height, allAgents) {
  const directions = [
    { dx: 0, dy: -1 }, // haut
    { dx: 1, dy: 0 },  // droite
    { dx: 0, dy: 1 },  // bas
    { dx: -1, dy: 0 }  // gauche
  ];
  
  // Filtrer les directions possibles (pas de mur)
  const possibleMoves = directions.filter(dir => {
    const newX = agent.x + dir.dx;
    const newY = agent.y + dir.dy;
    return newX >= 0 && newX < width && newY >= 0 && newY < height;
  });
  
  // Si aucune direction possible (entouré de murs), reste sur place
  if (possibleMoves.length === 0) {
    return { ...agent, attemptedMove: null };
  }
  
  // Choisir une direction aléatoire parmi les possibles
  const dir = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  
  const newX = agent.x + dir.dx;
  const newY = agent.y + dir.dy;
  
  // Vérifier si la case d'arrivée est occupée
  const occupant = allAgents.find(a => a.x === newX && a.y === newY && a.id !== agent.id);
  
  return {
    ...agent,
    attemptedX: newX,
    attemptedY: newY,
    attemptedMove: dir,
    collision: occupant ? occupant.id : null
  };
}

/**
 * Résout les duels quand deux agents veulent la même case
 */
function resolveDuels(agents) {
  // D'abord, créer une map des mouvements tentés
  const moveMap = new Map(); // "x,y" -> [agents qui veulent aller là]
  
  agents.forEach(agent => {
    if (agent.attemptedX !== undefined && agent.attemptedY !== undefined) {
      const key = `${agent.attemptedX},${agent.attemptedY}`;
      if (!moveMap.has(key)) {
        moveMap.set(key, []);
      }
      moveMap.get(key).push(agent);
    }
  });
  
  // Ensuite, pour chaque case avec plusieurs prétendants
  const finalAgents = [];
  
  agents.forEach(agent => {
    let finalAgent = { ...agent };
    
    // Si l'agent a tenté un mouvement
    if (agent.attemptedX !== undefined && agent.attemptedY !== undefined) {
      const key = `${agent.attemptedX},${agent.attemptedY}`;
      const contenders = moveMap.get(key);
      
      if (contenders.length === 1) {
        // Seul sur sa case d'arrivée
        finalAgent.x = agent.attemptedX;
        finalAgent.y = agent.attemptedY;
      } else {
        // Plusieurs veulent la même case - DUEL !
        // Le duel est résolu par la couleur (la plus foncée gagne ?)
        // Ou aléatoirement ? Je propose par couleur hex (ordre numérique)
        contenders.sort((a, b) => {
          // Convertir couleur hex en nombre pour comparer
          const colorA = parseInt(a.color.substring(1), 16);
          const colorB = parseInt(b.color.substring(1), 16);
          return colorB - colorA; // La plus grande valeur hex gagne
        });
        
        if (contenders[0].id === agent.id) {
          // Le gagnant avance
          finalAgent.x = agent.attemptedX;
          finalAgent.y = agent.attemptedY;
        } else {
          // Le perdant reste sur place
          // (pas de changement de position)
        }
      }
    }
    
    // Nettoyer les propriétés temporaires
    delete finalAgent.attemptedX;
    delete finalAgent.attemptedY;
    delete finalAgent.attemptedMove;
    delete finalAgent.collision;
    
    finalAgents.push(finalAgent);
  });
  
  return finalAgents;
}

/**
 * Exécute un tick complet de simulation
 */
export function tickAgents(agents, width, height) {
  if (!agents || agents.length === 0) return [];
  
  // 1. Chaque agent décide de son mouvement
  const agentsWithMoves = agents.map(agent => 
    moveAgent(agent, width, height, agents)
  );
  
  // 2. Résolution des duels
  const agentsAfterDuels = resolveDuels(agentsWithMoves);
  
  // 3. Détection des groupes
  const groups = getGroups(agentsAfterDuels, width, height);
  
  // 4. Transfert de couleur
  const finalAgents = processColorTransfer(groups, agentsAfterDuels);
  
  return finalAgents;
}