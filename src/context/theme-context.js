import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background:'#eeeeee',
    color: '#000',
    name: 'light'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    color: '#fff',
    name: 'dark'
  }
}
// 共享源数据
export const ThemeContext = React.createContext({
  theme: themes.dark, // 默认值(只有当找不到context的情况下才会使用这个默认值) type: object
  toggleTheme: () => {}
})
