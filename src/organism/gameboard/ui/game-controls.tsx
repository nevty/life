import { useUnit } from "effector-react"
import { isRunning, runGame, stopGame, tick, setDelay, $delay } from "../model"
import { clearCells } from "../../../atoms/cell"

export const GameControls = () => {
    const isGameRunning = useUnit(isRunning)
    const delay = useUnit($delay)

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <label htmlFor="delay-slider">Delay:</label>
                <input
                    id="delay-slider"
                    type="range"
                    min="1"
                    max="150"
                    value={delay}
                    onChange={(e) => setDelay(Number(e.target.value))}
                    style={{ width: '100px' }}
                />
                <span>{useUnit($delay)} ms</span>
            </div>
        </div>
    )
}