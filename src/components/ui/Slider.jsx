import React from 'react';

export function Slider({ value, onChange, min = 0, max = 100, step = 1, label }) {
  return (
    <div style={{ margin: '10px 0' }}>
      {label && <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>}
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        style={{ width: '100%' }}
      />
      <div style={{ textAlign: 'center' }}>{value}</div>
    </div>
  );
}