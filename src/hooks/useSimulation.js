import { useState, useRef, useEffect } from 'react';
import { initializeAgents, tickAgents, getColorDistribution, hasWinner } from '../simulation';

export function useSimulation({ initialWidth = 20, initialHeight = 20, initialAgents = 100 }) {
  const [gridWidth, setGridWidth] = useState(initialWidth);
  const [gridHeight, setGridHeight] = useState(initialHeight);
  const [agentCount, setAgentCount] = useState(initialAgents);
  const [agents, setAgents] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  const requestRef = useRef();

  // Initialize agents
  const initialize = () => {
    const newAgents = initializeAgents(agentCount, gridWidth, gridHeight);
    setAgents(newAgents);
    setIteration(0);
    setWinner(null);
  };

  useEffect(() => {
    initialize();
  }, []);

  // Simulation tick loop
  const tick = () => {
    setAgents(prev => {
      const updated = tickAgents(prev, gridWidth, gridHeight);
      const dist = getColorDistribution(updated);
      if (hasWinner(dist)) {
        setWinner(Object.keys(dist)[0]);
        setRunning(false);
        cancelAnimationFrame(requestRef.current);
      }
      return updated;
    });
    setIteration(prev => prev + 1);
    if (running) requestRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!running) {
      setRunning(true);
      requestRef.current = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    setRunning(false);
    cancelAnimationFrame(requestRef.current);
  };

  const restart = (config) => {
    stop();
    if (config) {
      if (config.gridWidth) setGridWidth(config.gridWidth);
      if (config.gridHeight) setGridHeight(config.gridHeight);
      if (config.agentCount) setAgentCount(config.agentCount);
    }
    initialize();
  };

  return {
    agents,
    gridWidth,
    gridHeight,
    agentCount,
    iteration,
    running,
    winner,
    start,
    stop,
    restart,
    setGridWidth,
    setGridHeight,
    setAgentCount
  };
}
