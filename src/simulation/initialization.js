import { COLORS } from "./constants.js";
import { shuffleArray } from "../utils/shuffle.js";

/**
 * Initializes a list of agents positioned on a grid.
 *
 * Each agent is assigned a color distributed evenly
 * from the available color pool.
 *
 * @param {number} gridWidth - Width of the grid
 * @param {number} gridHeight - Height of the grid
 * @param {number} numAgents - Total number of agents to create
 *
 * @returns {Array<{id: number, x: number, y: number, color: string}>} List of initialized agents
 *
 * @throws {Error} If the number of agents exceeds the grid capacity
 *
 * @example
 * const agents = initializeAgents(20, 20, 50);
 */
export function initializeAgents(gridWidth, gridHeight, numAgents) {
  if (numAgents > gridWidth * gridHeight) {
    throw new Error("Trop d'agents pour la grille");
  }

  const colorPool = [];

  if (numAgents <= 10) {
    for (let i = 0; i < numAgents; i++) colorPool.push(COLORS[i]);
  } else {
    const base = Math.floor(numAgents / 10);
    const rest = numAgents % 10;

    for (let i = 0; i < 10; i++) {
      const count = base + (i < rest ? 1 : 0);
      for (let j = 0; j < count; j++) colorPool.push(COLORS[i]);
    }
  }

  shuffleArray(colorPool);

  const occupied = new Set();
  const agents = [];

  for (let i = 0; i < numAgents; i++) {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * gridWidth);
      y = Math.floor(Math.random() * gridHeight);
      key = `${x},${y}`;
    } while (occupied.has(key));

    occupied.add(key);
    agents.push({ id: i, x, y, color: colorPool[i] });
  }

  return agents;
}
