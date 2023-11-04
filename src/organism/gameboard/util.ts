export const convertPresetToIndexedCells = (preset: Array<Array<0 | 1>>, [gridCols, gridRows]: [number, number]) => {
    // col/row offset to position the preset in the center of the field
    const colOffset = Math.floor((gridCols - preset[0].length) / 2);
    const rowOffset = Math.floor((gridRows - preset.length) / 2);

    return preset.reduce((cells, cols, rowIndex) => {
        const converted = cols.reduce((c, state, colIndex) => {
            if (state === 1) {
                const cellIndex = (rowOffset + rowIndex) * gridCols + (colOffset + colIndex)
                return [...c, cellIndex]
            }
            return c
        }, [] as number[])
        
        return [...cells, ...converted]
    }, [] as number[])
}