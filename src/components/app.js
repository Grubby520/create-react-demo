import React from 'react'
import { themes, ThemeContext } from '../context/theme-context'
import ThemedButton from './context'
import ThemeTogglerButton from './theme-toggler-button'

// 测试用中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme} />
  )
}

// 没有onClick的中间组件
function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSetTheme = this.handleSetTheme.bind(this)
    this.state = {
      theme: themes.light,
      toggleTheme: this.handleSetTheme
    }
  }

  handleSetTheme() {
    console.log('handleSetTheme')
    this.setState(state => ({
      theme: state.theme === themes.light ? themes.dark : themes.light
    }))
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          {/* 按钮初始化为\light\ */}
          {/* <Toolbar changeTheme={this.handleSetTheme}></Toolbar> */}
          {/* 把更新Context的方法传进去 */}
          <Content />
          <section>
            {/* 按钮初始化为\light\ 内部维护的Context状态 */}
            <ThemedButton></ThemedButton>
        </section>
        </ThemeContext.Provider>
        <section>
          {/* 按钮初始化为\light\ 内部维护的Context状态 */}
          <ThemedButton></ThemedButton>
        </section>
      </div>
    )
  }
}

export default App
