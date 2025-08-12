# 🧬 Conway's Game of Life

Interactive implementation of John Conway's famous cellular automaton using modern web technologies.

## 🌐 Demo

[https://nevty.github.io/life/](https://nevty.github.io/life/)

## 🎮 Controls

### Mouse
- Left click: Draw/erase cells
- Right drag: Move across the field
- Scroll: Zoom

## 🚀 Tech Stack

- React 18
- TypeScript
- Effector
- Konva.js
- Vite
- Yarn

## 🎯 Architecture

Follows atomic design principles:

```
src/
├── atoms/      # Basic components (cells, themes)
├── molecules/  # Composite components (grid)
├── organism/   # Complex components (game board, controls)
└── templates/  # Page templates
```

### Key Modules
- **GameBoard**: Main game canvas rendering
- **Grid**: Optimized grid rendering
- **GameControls**: Game control panel
- **PresetSelector**: Pattern presets

## 📦 Installation & Running

```bash
# Clone repository
git clone https://github.com/nevty/life.git && cd life

# Install dependencies
yarn install

# Development mode
yarn dev
```