import React from 'react';

export function InfoPanel({ iteration, winner, colorDistribution }) {
  const totalAgents = Object.values(colorDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="info-panel">
      <div>Itération: {iteration}</div>
      <div>Gagnant: {winner ? (
        <span style={{ color: winner, fontWeight: 'bold' }}>{winner}</span>
      ) : 'Aucun'}</div>
      
      <div className="color-distribution">
        <h4>Distribution des couleurs:</h4>
        {Object.entries(colorDistribution).map(([color, count]) => (
          <div key={color} className="color-bar-container">
            <div className="color-label">
              <span style={{ 
                display: 'inline-block', 
                width: '12px', 
                height: '12px', 
                backgroundColor: color,
                borderRadius: '2px',
                marginRight: '5px'
              }} />
              {color}: {count}
            </div>
            <div className="progress-bar-bg" style={{ 
              background: '#eee', 
              borderRadius: '4px', 
              overflow: 'hidden',
              marginTop: '2px'
            }}>
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${(count / totalAgents) * 100}%`,
                  backgroundColor: color,
                  height: '20px',
                  transition: 'width 0.2s'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}