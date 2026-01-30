
/**
 * Applies color transfer rules to connected groups of agents.
 *
 * In each group, the most common color is applied to all agents.
 * If multiple colors are tied for most common, no change occurs.
 *
 * @param {Array<{id:number, x:number, y:number, color:string}>} agents
 * @param {Array<Array<{id:number, x:number, y:number, color:string}>>} groups
 *
 * @returns {Array<{id:number, x:number, y:number, color:string}>} Updated list of agents
 */
export function applyColorTransfers(agents, groups) {
  const updated = agents.map(a => ({ ...a }));
  const map = {};
  updated.forEach(a => (map[a.id] = a));

  groups.forEach(group => {
    const counts = {};
    group.forEach(a => {
      counts[a.color] = (counts[a.color] || 0) + 1;
    });

    const max = Math.max(...Object.values(counts));
    const winners = Object.keys(counts).filter(c => counts[c] === max);

    if (winners.length === 1) {
      group.forEach(a => (map[a.id].color = winners[0]));
    }
  });

  return updated;
}
