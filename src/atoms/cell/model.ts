import { createEvent, createStore } from "effector";

export const clearCells = createEvent()
export const setCells = createEvent<number[]>();
export const toggleCell = createEvent<number>()

export const $cells = createStore<number[]>([],
    {
        updateFilter: (old, current) => old.length !== current.length
            || old.sort().toString() !== current.sort().toString()
    }
)
    .on(toggleCell, (cells, number) => cells.includes(number)
        ?
        cells.filter(c => c !== number)
        :
        [...cells, number]
    )
    .on(setCells, (_, cells) => cells)
    .reset(clearCells);
