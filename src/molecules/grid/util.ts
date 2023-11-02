export const cycleIndexedCells = (cells: number[], [gridCols, gridRows]: [number, number]) => {
    const SHIFT_VARIANTS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    const counterMatrix: {[k: number]: {[v: number]: number}} = {}

    // mark existed cells for exclusion on life/death condition
    cells.forEach(number => {
        const j = Math.floor(number / gridCols)
        if (!counterMatrix[j]) counterMatrix[j] = {}
        const i = number - j * gridCols
        counterMatrix[j][i] = .5
    });

    cells.forEach(number => {
        const j = Math.floor(number / gridCols)
        const i = number - j * gridCols
        
        // add +1 in each surrounding cell(SHIFT_VARIANTS)
        SHIFT_VARIANTS.forEach(([iShift, jShift]) => {
            // out of grid
            if ((i + iShift < 0 || gridCols <= i + iShift) || (j + jShift < 0 || gridRows <= j + jShift)) return

            if (!counterMatrix[j + jShift]) counterMatrix[j + jShift] = {}
            if (!counterMatrix[j + jShift][i +iShift]) counterMatrix[j + jShift][i +iShift] = 0
            counterMatrix[j + jShift][i +iShift] += 1
        })
    });
    return Object.entries(counterMatrix).reduce<number[]>((cm, [rowIndexKey, row]) => {
        const livingCellsIndices = Object.entries(row).reduce((acc: number[], [colKey, counter]) => {
            const rowIndex = Number(rowIndexKey)
            const colIndex = Number(colKey)

            return (counter > 2) && (counter < 4) && (counter % 2 !== 0) ? acc.concat(rowIndex * gridCols + colIndex) : acc
        }, [])
        return [...cm, ...livingCellsIndices]
    }, [])
}
