import { useSimulation } from './hooks/useSimulation';
import Window from './components/layout/Window';
import SimulationCanvas from './components/canvas/SimulationCanvas';
import { ControlPanel } from './components/panels/ControlPanel';
import { InfoPanel } from './components/panels/InfoPanel';
import { getColorDistribution } from './simulation/colorTransfer';

function App() {
  const simulation = useSimulation({
    initialWidth: 25,
    initialHeight: 25,
    initialAgents: 10
  });

  // Ajout d'une vérification de sécurité
  const colorDistribution = simulation.agents?.length > 0 
    ? getColorDistribution(simulation.agents) 
    : {};

  // Debug - à enlever après
  console.log('Simulation state:', simulation);

  return (
    <Window>
      <ControlPanel 
        start={simulation.start}
        stop={simulation.stop}
        restart={simulation.restart}
        agentCount={simulation.agentCount}
        gridWidth={simulation.gridWidth}
        gridHeight={simulation.gridHeight}
        setAgentCount={simulation.setAgentCount}
        setGridWidth={simulation.setGridWidth}
        setGridHeight={simulation.setGridHeight}
      />
      <SimulationCanvas 
        agents={simulation.agents || []}
        gridWidth={simulation.gridWidth}
        gridHeight={simulation.gridHeight}
        cellSize={10}
      />
      <InfoPanel 
        iteration={simulation.iteration}
        winner={simulation.winner}
        colorDistribution={colorDistribution}
      />
    </Window>
  );
}

export default App;