import { useUnit } from "effector-react"
import { isRunning, runGame, stopGame, tick } from "../model"
import { clearCells } from "../../../atoms/cell"

export const GameControls = () => {
    const isGameRunning = useUnit(isRunning)

    return (
        <div style={{
            display: 'flex',
            gap: "5px"
        }}>
            {
                isGameRunning ?
                    <button onClick={() => stopGame()}>Pause ⏳</button> :
                    <button onClick={() => runGame()}>Start 🔥</button>
            }
            <button onClick={() => {
                stopGame()
                tick()
            }}>
                1 Step
            </button>
            <button onClick={() => {
                stopGame()
                clearCells()
            }}>
                Clear
            </button>
        </div>
    )
}