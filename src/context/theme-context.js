import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background:'#eeeeee',
    name: 'light'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    name: 'dark'
  }
}

export const ThemeContext = React.createContext(
  themes.dark // 默认值 type: object
)
