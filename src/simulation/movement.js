import { DIRECTIONS } from "./constants.js";

/**
 * Moves agents randomly on the grid.
 * Agents can move one step in any of the four directions or stay in place.
 * Collisions are resolved randomly so only one agent moves to a contested cell.
 *
 * @param {Array<{id:number, x:number, y:number, color:string}>} agents
 * @param {number} gridWidth
 * @param {number} gridHeight
 *
 * @returns {Array<{id:number, x:number, y:number, color:string}>} Updated list of agents
 */
export function moveAgents(agents, gridWidth, gridHeight) {
  const intentions = agents.map(agent => {
    const dir = DIRECTIONS[Math.floor(Math.random() * 5)];
    let tx = agent.x + dir.dx;
    let ty = agent.y + dir.dy;

    if (tx < 0 || tx >= gridWidth || ty < 0 || ty >= gridHeight) {
      tx = agent.x;
      ty = agent.y;
    }

    return {
      id: agent.id,
      fromX: agent.x,
      fromY: agent.y,
      toX: tx,
      toY: ty
    };
  });

  const targetMap = {};
  intentions.forEach(i => {
    const key = `${i.toX},${i.toY}`;
    if (!targetMap[key]) targetMap[key] = [];
    targetMap[key].push(i.id);
  });

  Object.values(targetMap).forEach(ids => {
    if (ids.length > 1) {
      const winner = ids[Math.floor(Math.random() * ids.length)];
      ids.forEach(id => {
        if (id !== winner) {
          const intent = intentions.find(i => i.id === id);
          intent.toX = intent.fromX;
          intent.toY = intent.fromY;
        }
      });
    }
  });

  return agents.map(agent => {
    const intent = intentions.find(i => i.id === agent.id);
    return { ...agent, x: intent.toX, y: intent.toY };
  });
}
