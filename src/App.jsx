import React from 'react';
import { useSimulation } from './hooks/useSimulation';
import { SimulationCanvas } from './components/canvas/SimulationCanvas';
import { ControlPanel } from './components/panels/ControlPanel';
import { InfoPanel } from './components/panels/InfoPanel';
import './styles/global.css';
import './styles/theme.css';

export default function App() {
  const sim = useSimulation({ initialWidth: 20, initialHeight: 20, initialAgents: 100 });

  return (
    <div className="app">
      <h1>Multi-Agent Grid Simulation</h1>
      <ControlPanel {...sim} />
      <InfoPanel iteration={sim.iteration} winner={sim.winner} colorDistribution={sim.agents.reduce((acc, a) => {
        acc[a.color] = (acc[a.color] || 0) + 1;
        return acc;
      }, {})} />
      <SimulationCanvas agents={sim.agents} gridWidth={sim.gridWidth} gridHeight={sim.gridHeight} />
    </div>
  );
}
