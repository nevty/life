import { createEvent, createStore, sample } from "effector";
import { interval } from "patronum";

import { $cells } from "../../atoms/cell";
import { cycleIndexedCells } from "../../molecules/grid";

type GameSettings = {
    width: number,
    height: number,
    cols: number,
    rows: number,
    cellSize: number
}

export const setGameSettings = createEvent<GameSettings>()
export const resetGameSettings = createEvent()

export const runGame = createEvent();
export const stopGame = createEvent();
export const setDelay = createEvent<number>();

export const $delay = createStore(20)
    .on(setDelay, (_, time) => time);
export const $gameSettings = createStore<GameSettings>({ width: 0, height: 0, cols: 0, rows: 0, cellSize: 0 })
    .on(setGameSettings, (_, props) => props)
    .reset(resetGameSettings)

export const { tick, isRunning } = interval({
    start: runGame,
    timeout: $delay,
    stop: stopGame,
});

sample({
    clock: tick,
    source: {
        cells: $cells,
        settings: $gameSettings
    },
    fn: ({ cells, settings: { cols, rows } }) => cycleIndexedCells(cells, [cols, rows]),
    target: $cells
});