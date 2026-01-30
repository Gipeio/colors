/**
 * Checks if all agents have the same color.
 *
 * @param {Array<{id:number, x:number, y:number, color:string}>} agents
 * @returns {boolean} True if all agents have the same color
 */
export function checkWinCondition(agents) {
  return new Set(agents.map(a => a.color)).size === 1;
}
