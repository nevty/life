import { useRef } from "react"
import Konva from "konva"
import { Stage } from "react-konva"
import { useUnit } from "effector-react"
import { $cells, toggleCell } from "../../../atoms/cell"
import { $theme, THEMES } from "../../../atoms/game-theme"
import { Grid } from "../../../molecules/grid"
import { stopGame } from "../model"

type GameBoardProps = {
    width: number
    height: number
    cellSize: number
    cols: number
    rows: number
}

export const GameBoard = ({ width, height, cols, rows, cellSize }: GameBoardProps) => {
    const cells = useUnit($cells)
    const stageRef = useRef<Konva.Stage>(null)
    const theme = useUnit($theme)

    const onStageClick = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
        stopGame()
        const point = target.getRelativePointerPosition()
        const number = (Math.floor(point.y / cellSize) * cols) + Math.floor(point.x / cellSize)
        toggleCell(number)
    }

    return (
        <Stage
            ref={stageRef}
            onClick={onStageClick}
            width={width}
            height={height}
            style={{ backgroundColor: THEMES[theme].background }}
        >
            <Grid
                width={width}
                height={height}
                cellSize={cellSize}
                cols={cols}
                rows={rows}
                cells={cells}
                cellColor={THEMES[theme].cell}
            />
        </Stage>
    )
}