import './index.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import { BasicExample } from './components/basicExample'
import App from './components/app'

const $root = document.getElementById('root')

// 1. 无障碍，这在国内有啥意义? ---------------------
// DOM元素的Refs设置焦点
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.focus()
  }

  focus() {
    console.log(this.textInput)
    // 框架包装了一层 \{current: input}\
    this.textInput.current.focus()
  }

  render() {
    return (
      <input type="text" ref={this.textInput} />
    )
  }
}

// ReactDOM.render(
//   <CustomTextInput />,
//   $root
// )

class CustomTextInputChild extends React.Component {
  render() {
    return (
      <input type="text" ref={this.props.inputRef} />
    )
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.inputEl = React.createRef()
  }

  componentDidMount() {
    this.focus()
  }

  focus() {
    console.log(this.inputEl)
    this.inputEl.current.focus()
  }

  render() {
    return (
      <CustomTextInputChild inputRef={ this.inputEl } />
    )
  }
}

// ReactDOM.render(
//   <Parent />,
//   $root
// )

class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)
    this.toggleContainer = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.state = {
      isOpen: true,
      list: [
        {
          label: 'label',
          value: 'value'
        }
      ]
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleToggleClick, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleToggleClick)
  }

  handleToggleClick(ev) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(ev.target)) {
      this.setState(state => ({
        isOpen: !state.isOpen
      }))
    }
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))

  }

  render() {
    return (
      <div className="container">
      <p>Title</p>
        <div className="select-content" ref={this.toggleContainer}>
          {/* wtf: map 就不能渲染DOM元素? */}
          {/* {
            this.state.isOpen && this.state.list.map(item =>
              <p>{item.value}</p>
            )
          } */}
          <p>
            <button onClick={this.handleClick}>{this.state.isOpen ? 'close' : 'open'}</button>
          </p>
          {
            this.state.isOpen && (
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
              </ul>
            )
          }
        </div>
      </div>
    )
  }
}

// ReactDOM.render(
//   <OuterClickExample />,
//   $root
// )


const LazyComponent = React.lazy(() => import('./components/lazyComponent'))

class AppComponent extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    )
  }
}

// ReactDOM.render(
//   <AppComponent />,
//   $root
// )

// ReactDOM.render(
//   <BasicExample />,
//   $root
// )

ReactDOM.render(
  <App />,
  $root
)
