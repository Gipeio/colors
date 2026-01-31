import React, { useRef, useEffect } from 'react';

export function SimulationCanvas({ agents, gridWidth, gridHeight, width = 600, height = 600 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const cellWidth = width / gridWidth;
    const cellHeight = height / gridHeight;

    agents.forEach(agent => {
      ctx.fillStyle = agent.color;
      ctx.fillRect(agent.x * cellWidth, agent.y * cellHeight, cellWidth, cellHeight);
    });
  }, [agents, gridWidth, gridHeight, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '2px solid #ccc', borderRadius: '4px' }} />;
}
