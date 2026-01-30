/**
 * Detects connected groups of agents.
 * Two agents are connected if they are adjacent horizontally or vertically.
 * Only groups of size >= 2 are returned.
 *
 * @param {Array<{id:number, x:number, y:number, color:string}>} agents
 *
 * @returns {Array<Array<{id:number, x:number, y:number, color:string}>>} Array of connected groups
 */
export function detectConnectedGroups(agents) {
  const visited = new Set();
  const groups = [];

  const posMap = {};
  agents.forEach(a => (posMap[`${a.x},${a.y}`] = a));

  function neighbors(a) {
    return [
      posMap[`${a.x - 1},${a.y}`],
      posMap[`${a.x + 1},${a.y}`],
      posMap[`${a.x},${a.y - 1}`],
      posMap[`${a.x},${a.y + 1}`]
    ].filter(Boolean);
  }

  function dfs(start) {
    const stack = [start];
    const group = [];
    visited.add(start.id);

    while (stack.length) {
      const cur = stack.pop();
      group.push(cur);
      neighbors(cur).forEach(n => {
        if (!visited.has(n.id)) {
          visited.add(n.id);
          stack.push(n);
        }
      });
    }
    return group;
  }

  agents.forEach(agent => {
    if (!visited.has(agent.id)) {
      const g = dfs(agent);
      if (g.length >= 2) groups.push(g);
    }
  });

  return groups;
}
