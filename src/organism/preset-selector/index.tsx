import { Stage } from "react-konva"
import { $theme, THEMES } from "../../atoms/game-theme"
import { Grid } from "../../molecules/grid"
import { convertPresetToIndexedCells } from "../gameboard"
import { useUnit } from "effector-react"

const CELL_SIZE = 8

type PresetSelectorProps = {
    preset: Array<Array<0 | 1>>
    onSelect: () => void
}

export const PresetSelector = ({ preset, onSelect }: PresetSelectorProps) => {
    const theme = useUnit($theme)
    const cols = preset[0].length
    const rows = preset.length
    const presetCells = convertPresetToIndexedCells(preset, [cols, rows])
    const width = (cols * CELL_SIZE) + 2
    const height = (rows * CELL_SIZE) + 2

    return (
        <Stage width={width} height={height} onClick={onSelect}
            style={{ backgroundColor: THEMES[theme].background, cursor: 'pointer' }}
        >
            <Grid
                cols={cols}
                rows={rows}
                width={width}
                height={height}
                cellSize={CELL_SIZE}
                cells={presetCells}
                cellColor={THEMES[theme].cell}
            />
        </Stage>
    )
}