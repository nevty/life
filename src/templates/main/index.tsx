import { useEffect, useRef } from "react"
import { useUnit } from "effector-react";
import { setCells } from "../../atoms/cell";
import { $gameSettings, GameControls, GameBoard, convertPresetToIndexedCells, setGameSettings, stopGame, GridControls } from "../../organism/gameboard"
import { stats } from "../../organism/gameboard/ui/stats";
import { PresetSelector } from '../../organism/preset-selector';
import { PRESETS } from "./presets";


export const Main = () => {
  const settings = useUnit($gameSettings)
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const selectCellSize = (size: number) => {
    const { width, height } = settings
    const cols = Math.floor(width / size)
    const rows = Math.floor(height / size)
    stopGame()
    setCells([])
    setGameSettings({
      ...settings,
      cellSize: size,
      width: cols * size,
      height: rows * size,
      cols,
      rows
    })
  }
  const selectPreset = (preset: Array<Array<0 | 1>>) => {
    const { cols, rows } = settings
    stopGame()
    setCells(convertPresetToIndexedCells(preset, [cols, rows]))
  }

  useEffect(() => {
    if (containerRef.current) {
      const DEFAULT_CELL_SIZE = 8
      const el = containerRef.current
      const elWidth = el.clientWidth
      const elHeight = el.clientHeight
      const cols = Math.floor(elWidth / DEFAULT_CELL_SIZE);
      const rows = Math.floor(elHeight / DEFAULT_CELL_SIZE);

      setGameSettings({
        width: cols * DEFAULT_CELL_SIZE,
        height: rows * DEFAULT_CELL_SIZE,
        cols,
        rows,
        cellSize: DEFAULT_CELL_SIZE
      })
      setCells(convertPresetToIndexedCells(PRESETS[0].preset, [cols, rows]))
    }
  }, [])

  useEffect(() => {
    if (statsRef.current) {
      statsRef.current.appendChild(stats.dom)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '20px'
    }}>
      <div ref={statsRef} style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1 }} />
      <div
        style={{
          height: '70vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
        ref={containerRef}
      >
        {containerRef.current && <GameBoard
          width={settings.width}
          height={settings.height}
          cols={settings.cols}
          rows={settings.rows}
          cellSize={settings.cellSize}
        />}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
          <span>Controls:</span>
          <GameControls />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
          <span>Cell size:</span>
          <GridControls onSelect={selectCellSize} />
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px'
      }}>
        {PRESETS.map(({ preset, title }, index) => {
          const onSelect = () => selectPreset(preset)
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '6px'
              }}>
              <span style={{ fontSize: '18px' }}>{title}</span>
              <PresetSelector
                onSelect={onSelect}
                preset={preset}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}