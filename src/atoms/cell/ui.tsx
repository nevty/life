import Konva from "konva"
import { Rect } from "react-konva"

export interface LifeCellProps extends Konva.RectConfig {
}

export const LifeCell = ({ ...rectConf }: LifeCellProps) => (
    <Rect
        {...rectConf}
    />
)