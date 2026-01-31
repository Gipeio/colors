import React from 'react';

export function InfoPanel({ iteration, winner, colorDistribution }) {
  return (
    <div className="info-panel">
      <div>Iteration: {iteration}</div>
      <div>Winner: {winner || 'None'}</div>
      <div>
        Colors:
        {Object.entries(colorDistribution).map(([color, count]) => (
          <span key={color} style={{ color, margin: '0 5px' }}>
            {color}: {count}
          </span>
        ))}
      </div>
    </div>
  );
}
