import { useState, useRef, useEffect } from 'react';
import { initializeAgents } from '../simulation/initialization';
import { tickAgents } from '../simulation/movement';
import { getColorDistribution } from '../simulation/colorTransfer';
import { hasWinner } from '../simulation/winCondition';

export function useSimulation({ initialWidth = 50, initialHeight = 50, initialAgents = 100 }) {
  const [gridWidth, setGridWidth] = useState(initialWidth);
  const [gridHeight, setGridHeight] = useState(initialHeight);
  const [agentCount, setAgentCount] = useState(initialAgents);
  const [agents, setAgents] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  const requestRef = useRef();
  const timeoutRef = useRef();

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

  // Simulation tick
  const tick = () => {
    setAgents(prev => {
      console.log('Before tick, agents count:', prev.length);
      const updated = tickAgents(prev, gridWidth, gridHeight);
      console.log('After tick, agents count:', updated.length);
      
      const dist = getColorDistribution(updated);
      if (hasWinner(dist)) {
        const winnerColor = Object.keys(dist)[0];
        setWinner(winnerColor);
        setRunning(false);
        return updated;
      }
      return updated;
    });
    setIteration(prev => prev + 1);
  };

  // Loop management
  useEffect(() => {
    if (running) {
      const loop = () => {
        tick();
        timeoutRef.current = setTimeout(loop, 100); // 100ms entre chaque tick
      };
      timeoutRef.current = setTimeout(loop, 100);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [running]);

  const start = () => {
    if (!running) {
      setRunning(true);
    }
  };

  const stop = () => {
    setRunning(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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