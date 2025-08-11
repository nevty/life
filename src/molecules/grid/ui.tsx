import Konva from "konva"
import { Group, Layer, Line, Rect } from "react-konva"
import { LifeCell } from "../../atoms/cell"

const CELLS_OUTLINE_COLOR = '#171717';

const getCellOutlineConfig = (cellSize: number): Konva.LineConfig => ({
	stroke: CELLS_OUTLINE_COLOR,
	strokeWidth: Math.min(1, cellSize / 3),
});

type GridPros = {
	width: number
	height: number
	cols: number
	rows: number
	cellSize: number
	cells: number[]
}

export const Grid = ({ width, height, cols, rows, cellSize, cells }: GridPros) => {
	const cellOutlinesX = new Array(cols).fill(getCellOutlineConfig(cellSize))
	const cellOutlinesY = new Array(rows).fill(getCellOutlineConfig(cellSize))

	return (
		<Layer listening={false} >
			<Group>
				{cells.map((order, i) => {
					const x = (order % cols) * cellSize
					const y = Math.floor(order / cols) * cellSize
					return (
						<LifeCell
							key={i}
							y={y}
							x={x}
							width={cellSize}
							height={cellSize}
						/>
					)
				})}
			</Group>
			<Rect
				x={1}
				y={1}
				width={width - 1}
				height={height - 1}
				stroke={CELLS_OUTLINE_COLOR}
				strokeWidth={1}
			/>
			{cellOutlinesY.map((l, i) => (
				<Line
					key={i}
					{...l}
					y={cellSize * i}
					points={[0, 0, width, 0]}
				/>
			)
			)}
			{cellOutlinesX.map((l, i) => (
				<Line
					key={i}
					{...l}
					x={cellSize * i}
					points={[0, 0, 0, height]}
				/>
			)
			)}
		</Layer>
	)
}