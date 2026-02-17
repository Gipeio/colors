import { useEffect, useRef } from 'react';

export default function SimulationCanvas({ agents, gridWidth, gridHeight, cellSize = 10 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw agents
    agents.forEach(agent => {
      ctx.fillStyle = agent.color;
      ctx.fillRect(
        agent.x * cellSize, 
        agent.y * cellSize, 
        cellSize - 1, // -1 pour créer une petite grille visible
        cellSize - 1
      );
    });
  }, [agents, gridWidth, gridHeight, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      width={gridWidth * cellSize}
      height={gridHeight * cellSize}
      style={{ border: '1px solid black' }}
    />
  );
}