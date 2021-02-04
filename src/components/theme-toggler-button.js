import { ThemeContext } from '../context/theme-context'

function ThemeTogglerButton() {
  // Context.Consumer
  return (
    <ThemeContext.Consumer>
      {
        ({ theme, toggleTheme }) => (
          <button
            onClick={toggleTheme}
            style={{backgroundColor: theme.background, color: theme.color}}>
            Toggle Theme
          </button>
        )
      }
    </ThemeContext.Consumer>
  )
}

export default ThemeTogglerButton
