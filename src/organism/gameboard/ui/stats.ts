import Stats from 'stats.js'

export const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom


export const withStats = <T>(fn: () => T) => {
    stats.begin()
    const result = fn()
    stats.end()
    return result
}