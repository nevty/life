import { createEvent, createStore } from "effector"

export const THEME_NAMES = ['abyss', 'lightModern', 'solarizedDark', 'solarizedLight', 'monokai', 'dracula', 'nord', 'oneDarkPro', 'material', 'cobalt2', 'nightOwl', 'synthwave84'] as const;
export type Theme = typeof THEME_NAMES[number]

// Theme Store
export const setTheme = createEvent<Theme>();

export const $theme = createStore<Theme>('cobalt2')
    .on(setTheme, (_, theme) => theme);

// Sample themes
export const THEMES = {
    dracula: {
        background: '#222222',
        cell: '#6f6'
    },
    abyss: {
        background: '#000000',
        cell: '#ff9d00'
    },
    lightModern: {
        background: '#f3f3f3',
        cell: '#007acc'
    },
    solarizedDark: {
        background: '#002b36',
        cell: '#268bd2'
    },
    solarizedLight: {
        background: '#fdf6e3',
        cell: '#dc322f'
    },
    monokai: {
        background: '#272822',
        cell: '#f92672'
    },
    nord: {
        background: '#2e3440',
        cell: '#88c0d0'
    },
    oneDarkPro: {
        background: '#282c34',
        cell: '#61afef'
    },
    material: {
        background: '#263238',
        cell: '#80cbc4'
    },
    cobalt2: {
        background: '#002240',
        cell: '#ffc600'
    },
    nightOwl: {
        background: '#011627',
        cell: '#d6deeb'
    },
    synthwave84: {
        background: '#2a2139',
        cell: '#f92aad'
    }
} satisfies { [key in Theme]: { background: string, cell: string } };
