import { initializeAgents } from './simulation/initialization.js';
import { moveAgents } from './simulation/movement.js';
import { detectConnectedGroups } from './simulation/groups.js';
import { applyColorTransfers } from './simulation/colorTransfer.js';
import { checkWinCondition } from './simulation/winCondition.js';

// CONFIG
const gridWidth = 10;
const gridHeight = 10;
const numAgents = 25;

// INITIALISATION
let agents = initializeAgents(gridWidth, gridHeight, numAgents);
let iteration = 0;
let finished = false;

console.log("Initial state:");
console.table(agents.map(a => ({id: a.id, x: a.x, y: a.y, color: a.color})));

// BOUCLE SIMULATION
while (!finished && iteration < 50) {  // max 50 ticks pour test
  iteration++;

  // 1. Déplacements
  agents = moveAgents(agents, gridWidth, gridHeight);

  // 2. Groupes
  const groups = detectConnectedGroups(agents);

  // 3. Transfert de couleur
  agents = applyColorTransfers(agents, groups);

  // 4. Condition de victoire
  finished = checkWinCondition(agents);

  console.log(`Iteration ${iteration}`);
  console.table(agents.map(a => ({id: a.id, x: a.x, y: a.y, color: a.color})));
}

if (finished) {
  console.log("Simulation terminée : une seule couleur restante !");
} else {
  console.log("Simulation arrêtée après 50 itérations");
}
