import Konva from "konva"
import { Rect } from "react-konva"

export const CELL_COLOR = '#6f6'

export interface LifeCellProps extends Konva.RectConfig {
}

export const LifeCell = ({ ...rectConf }: LifeCellProps) => (
    <Rect
        {...rectConf}
        fill={CELL_COLOR}
    />
)