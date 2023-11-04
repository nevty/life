import { Stage } from "react-konva"
import { Grid } from "../../molecules/grid"
import { convertPresetToIndexedCells } from "../gameboard"

const FIELD_BACKGOURND_COLOR = '#222222'

const CELL_SIZE = 8

type PresetSelectorProps = {
    preset: Array<Array<0 | 1>>
    onSelect: () => void
}

export const PresetSelector = ({ preset, onSelect }: PresetSelectorProps) => {
    const cols = preset[0].length
    const rows = preset.length
    const presetCells = convertPresetToIndexedCells(preset, [cols, rows])
    const width = (cols * CELL_SIZE) + 2
    const height = (rows * CELL_SIZE) + 2

    return (
        <Stage width={width} height={height} onClick={onSelect}
            style={{ backgroundColor: FIELD_BACKGOURND_COLOR, cursor: 'pointer' }}
        >
            <Grid
                cols={cols}
                rows={rows}
                width={width}
                height={height}
                cellSize={CELL_SIZE}
                cells={presetCells}
            />
        </Stage>
    )
}