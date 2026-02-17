import React from 'react';
import '../../styles/global.css';
import '../../styles/theme.css';

export default function Window({ children }) {
  const [leftPanel, centerPanel, rightPanel] = React.Children.toArray(children);

  return (
    <div className="app-window">
      <div className="panel left-panel">{leftPanel}</div>
      <div className="panel center-panel">{centerPanel}</div>
      <div className="panel right-panel">{rightPanel}</div>
    </div>
  );
}