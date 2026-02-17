import React, { useState } from 'react';
import { Button } from '../ui/Button';  // Attention : c'est { Button } pas Button tout seul

export function ControlPanel({ start, stop, restart, agentCount, gridWidth, gridHeight, setAgentCount, setGridWidth, setGridHeight }) {
  const [localAgents, setLocalAgents] = useState(agentCount);
  const [localWidth, setLocalWidth] = useState(gridWidth);
  const [localHeight, setLocalHeight] = useState(gridHeight);

  const handleRestart = () => {
    restart({ agentCount: localAgents, gridWidth: localWidth, gridHeight: localHeight });
  };

  return (
    <div className="control-panel">
      <Button onClick={start}>Start</Button>
      <Button onClick={stop}>Stop</Button>
      <Button onClick={handleRestart}>Restart</Button>

      <div className="config-inputs">
        <label>
          Agents:
          <input type="number" value={localAgents} onChange={e => setLocalAgents(+e.target.value)} min="1" />
        </label>
        <label>
          Grid Width:
          <input type="number" value={localWidth} onChange={e => setLocalWidth(+e.target.value)} min="1" />
        </label>
        <label>
          Grid Height:
          <input type="number" value={localHeight} onChange={e => setLocalHeight(+e.target.value)} min="1" />
        </label>
      </div>
    </div>
  );
}
