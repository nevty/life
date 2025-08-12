import { useRef, useState } from "react"
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
    const cells = useUnit($cells);
    const stageRef = useRef<Konva.Stage>(null);
    const theme = useUnit($theme);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const toggleCellAtPosition = (point: { x: number; y: number }) => {
        const number = (Math.floor(point.y / cellSize) * cols) + Math.floor(point.x / cellSize);
        toggleCell(number);
    };

    const handleMouseDown = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
        stopGame();
        setIsMouseDown(true);
        const point = target.getRelativePointerPosition();
        if (point) toggleCellAtPosition(point);
    };

    const handleMouseMove = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isMouseDown) return;
        const point = target.getRelativePointerPosition();
        if (point) toggleCellAtPosition(point);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <Stage
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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