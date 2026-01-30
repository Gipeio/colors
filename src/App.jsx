import React, { useState } from "react";
import { useSimulation } from "./hooks/useSimulation";
import SimulationCanvas from "./components/SimulationCanvas";
import ConfigPanel from "./components/ConfigPanel";
import ControlPanel from "./components/ControlPanel";
import InfoPanel from "./components/InfoPanel";

export default function App() {
  const [config, setConfig] = useState({
    gridWidth: 20,
    gridHeight: 20,
    numAgents: 50,
    canvasSize: 800
  });

  const sim = useSimulation(config);

  return (
    <div style={{ padding: 20 }}>
      <h1>Système Multi-Agent</h1>
      <ConfigPanel config={config} setConfig={setConfig} disabled={sim.isRunning} />
      <ControlPanel simulation={sim} config={config} />
      <SimulationCanvas agents={sim.agents} config={config} />
      <InfoPanel simulation={sim} />
    </div>
  );
}
