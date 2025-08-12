import { useUnit } from "effector-react"
import { $theme, setTheme, Theme, THEMES } from "./model"

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const GameThemeSelect = () => {
    const currentTheme = useUnit($theme)

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
            <label htmlFor="theme-selector">Theme:</label>
            <select
                id="theme-selector"
                onChange={(e) => setTheme(e.target.value as Theme)}
                value={currentTheme}
            >
                {[Object.entries(THEMES).map(([theme]) => (
                    <option key={theme} value={theme}>
                        {capitalize(theme)}
                    </option>
                ))]}
            </select>
        </div>
    )
}