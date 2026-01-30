import { useState, useRef, useEffect } from "react";
import { initializeAgents } from "../simulation/initialization";
import { moveAgents } from "../simulation/movement";
import { detectConnectedGroups } from "../simulation/groups";
import { applyColorTransfers } from "../simulation/colorTransfer";
import { checkWinCondition } from "../simulation/winCondition";


/**
 * Custom React hook to manage the simulation of agents.
 *
 * Provides functions to start, stop, and reset the simulation,
 * and exposes the current state of agents, iterations, and status.
 *
 * @returns {{
 *   agents: Array<{id:number, x:number, y:number, color:string}>,
 *   isRunning: boolean,
 *   isFinished: boolean,
 *   iteration: number,
 *   start: (config: {gridWidth:number, gridHeight:number, numAgents:number}) => void,
 *   stop: () => void,
 *   reset: () => void
 * }}
 *
 * @example
 * const { agents, start, stop, reset } = useSimulation();
 * start({ gridWidth: 10, gridHeight: 10, numAgents: 50 });
 */
export function useSimulation() {
  const [agents, setAgents] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [iteration, setIteration] = useState(0);
  const intervalRef = useRef(null);

  function start(config) {
    const newAgents = initializeAgents(
      config.gridWidth,
      config.gridHeight,
      config.numAgents
    );
    setAgents(newAgents);
    setIteration(0);
    setIsFinished(false);
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    stop();
    setAgents([]);
    setIteration(0);
    setIsFinished(false);
  }

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setAgents(prev => {
        let next = moveAgents(prev, config.gridWidth, config.gridHeight);
        const groups = detectConnectedGroups(next);
        next = applyColorTransfers(next, groups);

        if (checkWinCondition(next)) {
          setIsRunning(false);
          setIsFinished(true);
        }

        setIteration(i => i + 1);
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return { agents, isRunning, isFinished, iteration, start, stop, reset };
}
