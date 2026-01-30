
# 🌈 Grid-Based Multi-Agent Visual Simulation

A real-time simulation of colored agents on a 2D grid. Each agent moves randomly and adopts the majority color of connected groups. Built with **React + Canvas**, with the option to **run the pure simulation engine in Node.js**.

---

## 🚀 Features

- Real-time simulation of agents on a configurable grid
- Random movement with collision resolution
- Detection of connected groups (DFS, 4-connectivity)
- Color transfer based on group majority
- Win condition: one color remains
- Reactive UI with Canvas rendering
- **Testable back-end engine** without a browser

---

## 🏗️ Project Structure

```

colors/
├── src/
│   ├── simulation/       # Pure simulation engine
│   │   ├── initialization.js
│   │   ├── movement.js
│   │   ├── groups.js
│   │   ├── colorTransfer.js
│   │   └── winCondition.js
│   ├── components/       # React UI (ConfigPanel, ControlPanel, InfoPanel, Canvas)
│   ├── hooks/
│   │   └── useSimulation.js
│   └── App.jsx           # Main React component
├── src/testSimulation.js # Node.js script to test the engine without UI
├── package.json
└── README.md

````

---

## 🎨 Color Palette

| Color   | Hex      | Emoji |
|---------|---------|-------|
| Red     | #FF0000 | 🔴    |
| Blue    | #0000FF | 🔵    |
| Black   | #000000 | ⚫    |
| Yellow  | #FFFF00 | 🟡    |
| Violet  | #8B00FF | 🟣    |
| Orange  | #FF8C00 | 🟠    |
| Pink    | #FF1493 | 🩷    |
| Cyan    | #00FFFF | 🟦    |
| Magenta | #FF00FF | 🟪    |
| Lime    | #32CD32 | 🟢    |

---

## ⚡ Running the Simulation “Back-End” (Node.js)

Run the pure engine:

```bash
node src/testSimulation.js
```

* Displays agent positions and colors tick by tick
* Stops automatically if only **one color remains** or after 50 test iterations

---

## 🖥️ Running the React UI

1. Install React dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open in browser: `http://localhost:5173` (or the URL shown by Vite)

* Configure grid, number of agents, canvas size
* Controls: Start / Stop / Reset
* Info panel: simulation status, iterations, color distribution
* Canvas: real-time rendering of agents

---

## 🧠 Simulation Logic

1. **Initialization**

   * Agents distributed evenly across 10 colors
   * Random placement without collisions

2. **Simulation Tick**

   * Each agent picks a random move
   * Conflicts resolved (one agent per cell)
   * Connected groups detected (DFS, 4-connectivity)
   * Majority color transfer applied

3. **Win Condition**

   * Simulation ends when all agents share the same color




## 🎉 Author / Contributors

* Peïo Gil – Cloud Engineer