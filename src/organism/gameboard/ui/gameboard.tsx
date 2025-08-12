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
    const [isRightMouseDown, setIsRightMouseDown] = useState(false);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const newScale = scale + (e.evt.deltaY > 0 ? -0.1 : 0.1);
        let clampedScale = Math.max(0.5, Math.min(newScale, 6));

        const pointer = stageRef.current?.getPointerPosition();
        if (!pointer) return;
        const { x, y } = pointer;
        const offsetX = x - offset.x;
        const offsetY = y - offset.y;

        // Calculate visible area boundaries
        const visibleWidth = width / clampedScale;
        const visibleHeight = height / clampedScale;
        
        // Check if zooming would expose boundaries
        if (visibleWidth > width || visibleHeight > height) {
            clampedScale = scale; // Prevent zoom change
        }
        const newX = x - offsetX * (clampedScale / scale);
        const newY = y - offsetY * (clampedScale / scale);
        setOffset({ x: newX, y: newY });
        setScale(clampedScale);
    };

    const toggleCellAtPosition = () => {
        const point = stageRef.current?.getPointerPosition();
        if (!point) return;
        const adjustedX = (point.x - offset.x) / scale;
        const adjustedY = (point.y - offset.y) / scale;
        const number = (Math.floor(adjustedY / cellSize) * cols) + Math.floor(adjustedX / cellSize);
        toggleCell(number);
    };

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 0) { // Left mouse button
            stopGame();
            setIsMouseDown(true);
            toggleCellAtPosition();
        } else if (e.evt.button === 2) { // Right mouse button
            setIsRightMouseDown(true);
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (isMouseDown) {
            toggleCellAtPosition();
        } else if (isRightMouseDown) {
            const point = stageRef.current?.getPointerPosition();
            if (!point) return;

            setOffset((prevOffset) => ({
                x: prevOffset.x + e.evt.movementX,
                y: prevOffset.y + e.evt.movementY,
            }));
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setIsRightMouseDown(false);
    };

    return (
        <Stage
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onContextMenu={(e) => e.evt.preventDefault()}
            scaleX={scale}
            scaleY={scale}
            x={offset.x}
            y={offset.y}
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