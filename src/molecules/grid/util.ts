export const cycleIndexedCells = (
  cells: number[],
  [gridCols, gridRows]: [number, number]
) => {
  const neighborsCount = new Map<number, number>();
  const livingCells = new Set(cells);

  // For each living cell, increment the neighbor count for all its neighbors.
  for (const cellIndex of cells) {
    const row = Math.floor(cellIndex / gridCols);
    const col = cellIndex % gridCols;

    const SHIFT_VARIANTS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (const [rowOffset, colOffset] of SHIFT_VARIANTS) {
      const newRow = row + rowOffset;
      const newCol = col + colOffset;

      // Check grid boundaries
      if (newRow >= 0 && newRow < gridRows && newCol >= 0 && newCol < gridCols) {
        const neighborIndex = newRow * gridCols + newCol;
        neighborsCount.set(
          neighborIndex,
          (neighborsCount.get(neighborIndex) || 0) + 1
        );
      }
    }
  }

  const nextGeneration: number[] = [];

  // Iterate over all cells that have neighbors to determine the next generation.
  for (const [cellIndex, count] of neighborsCount.entries()) {
    // A living cell survives if it has 2 or 3 neighbors.
    if (livingCells.has(cellIndex)) {
      if (count === 2 || count === 3) {
        nextGeneration.push(cellIndex);
      }
    }
    // A dead cell becomes alive if it has exactly 3 neighbors.
    else {
      if (count === 3) {
        nextGeneration.push(cellIndex);
      }
    }
  }

  return nextGeneration;
};
