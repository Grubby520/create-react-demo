import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'


const $root = document.getElementById('root')
// const name = 'Josh Perez'
// const el = <h1>Hello, {name}, age: { 10 + 8 }</h1>

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName
// }
// const user = {
//   firstName: 'Harper',
//   lastName: 'Perez',
//   avatarUrl: 'www.baidu.com'
// }

// const element = (
//     <h6>
//         {el}
//         <span title={user.avatarUrl}>{formatName(user)}</span>
//     </h6>
// )

// const element_c = React.createElement(
//     'h6',
//     { className: 'color-red' },
//     'Hello World!'
// )

// ReactDOM.render(
//   element_c,
//   document.getElementById('root')
// )

// update root view, but actually, it only update the needed parts
// function tick() {
//     const el = (
//         <div>
//             <h6>It is { new Date().toTimeString() }</h6>
//         </div>
//     )
//     ReactDOM.render(el, $root)
// }

// setInterval(tick, 1000)

// 函数组件
function WelcomeFunction(props) {
  return <h1>Hello, {props.name}</h1>
}

// class组件
class WelcomeClass extends React.Component {
  render() {
    return <h1>Welcome_01 Hello, {this.props.name}</h1>
  }
}

const el = <WelcomeFunction name="Sara" /> // 入参 {name: 'Sara'}作为props return解析后的模板
// ReactDOM.render(
//     el,
//     $root
// )

const el_01 = <WelcomeClass name="Sara" />
// ReactDOM.render(
//     el_01,
//     $root
// )

function App() {
    return (
        <div>
            <WelcomeFunction name="Sara" />
            <WelcomeFunction name="Cahal" />
            <WelcomeFunction name="Edite" />
        </div>
    )
}

// ReactDOM.render(
//     <App />,
//     $root
// )

// 拆分组件 start --------------------------
function formatDate(date) {
    return date.toTimeString()
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  )
}

function Avatar(props) {
    return (
        <img className="avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
    )
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
            {props.user.name}
            </div>
        </div>
    )
}

// 这个props可以通过一个变量传进去?
const userObj = {
    author: {
        name: 'zhangsan',
        avatarUrl: 'data:image/svg+xmlbase64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
    },
    text: 'i am a student',
    date: new Date()
}

// 这tm得写多少个属性
// ReactDOM.render(
//     <Comment author={userObj.author} text={userObj.text} date={userObj.date} />,
//     $root
// )
// 拆分组件 end

// State & LifeCycle -----------------------------
function FormattedDate(props) {
  return <h2>date: {props.date.toLocaleTimeString()}.</h2>
}
class Clock extends React.Component {
  constructor(props) {
    super(props)
    // 有状态
    this.state = {
        date: new Date(),
        comments: []
    }
  }
  // mounted
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
    this.fetchComments().then(res => {
        this.setState({
            comments: res
        })
    })
  }
  // destroy
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  // define private methods
  tick() {
      /**
       * setState
       * 不能直接修改State
       * State更新可以是异步
       * State更新会被合并? 浅合并 wtf?
       */
    this.setState({
      date: new Date()
    })
  }

  fetchComments() {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(['comment1'])
          }, 1100)
      })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={ this.state.date } />
        <h2>comments: { this.state.comments.toString() }.</h2>
      </div>
    )
  }
}

// ReactDOM.render(
//     // 调用Clock构造函数，初始化this.state，调用setState()更新date
//     // React检测到state变更，重新调用render() 从而更新UI
//     <Clock />,
//     $root
// )

// Event Banding
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true
        }
        // question: wtf?
        // this.handleClick = this.handleClick.bind(this)
    }
    // class fields语法： 变量 箭头函数 this指向Toggle实例
    handleArrowClick = () => {
        this.setState(state => {
            // question: 必须要全量返回state?
            return {
                isToggleOn: !state.isToggleOn
            }
        })
    }
    // 普通函数
    handleClick(str) {
        console.log(str)
        this.setState(state => {
            // question: 必须要全量返回state?
            return {
                isToggleOn: !state.isToggleOn
            }
        })
    }

    render() {
        // return (
        //     // qa: 箭头函数调用普通函数的副作用：若把普通函数当props传给子组件，可能会导致子组件进行额外的重新渲染（其他情况可用）
        //     <button onClick={() => this.handleClick()}>
        //         {this.state.isToggleOn ? 'ON' : 'OFF'}
        //     </button>
        // )

        // return (
        //     // qa: 普通函数调用，则必须是class fields
        //     <button onClick={this.handleArrowClick}>
        //         {this.state.isToggleOn ? 'ON' : 'OFF'}
        //     </button>
        // )

        return (
            // TypeError： handleClick中this的值是undefined
            // <button onClick={this.handleClick}>
            // bind() 修改this指向作用域
            <button onClick={this.handleClick.bind(this, '我是参数')}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}

// ReactDOM.render(
//     <Toggle />,
//     $root
// )

/**
 * Conditional Rendering
 * render()中写条件语句
 * if && condition ? true : false
 * 组件函数中return null - 阻止渲染组件 / render中return null - 正常渲染组件
 */

// 8 列表 & Key(供React使用)
function NumberList(props) {
    const numbers = props.numbers
    const domList = numbers.map(num => <li key={num.toString()}>{num}</li>)
    return (
        <ul className="number-ul">
            {domList}
        </ul>
    )
}

function ListItem(props) {
  return (
    <li>{props.value}</li>
  )
}

// 简单的template是可以的，复杂度提升，还是得抽成component
function NumberListByMap(props) {
  const numbers = props.numbers
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  )
}

const numbers = [1, 2, 3, 4]
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     $root
// )
// ReactDOM.render(
//     <NumberListByMap numbers={numbers} />,
//     $root
// )

// 9 Form ------------------------------
class UserForm extends React.Component {
  constructor(props) {
    super(props)
    // mutable state 使React的state成为'唯一数据源'
    this.state = {
      name: '',
      textarea: 'this is textarea',
      select: 'lime'
    }
  }
  // 实际肯定不能这样玩 （得有成熟的解决方案 FORMIK)
  handleChange(key, event) {
    const value = event.target.value
    this.setState(() => {
      // updater 的返回值会与 state 进行浅合并 https://zh-hans.reactjs.org/docs/react-component.html#setstate
      return {
        [key]: value
      }
    })
  }

  handleSubmit(ev) {
    console.log(this.state)
    ev.preventDefault() // wtf,有修饰符吗?
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <p>
          <label>Name：
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
          </label>
        </p>
        <p>
          <label>Textarea：
            <textarea value={this.state.textarea} onChange={this.handleChange.bind(this, 'textarea')}></textarea>
          </label>
        </p>
        <p>
          <label>Select：
            <select value={this.state.select} onChange={this.handleChange.bind(this, 'select')}>
              <option value="grapefruit">葡萄柚</option>
              <option value="lime">酸橙</option>
              <option value="coconut">椰子</option>
              <option value="mango">芒果</option>
            </select>
          </label>
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    )
  }
}

// ReactDOM.render(
//   <UserForm />,
//   $root
// )

// 10 状态提升 - 多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state ---------------------------

function BoilingVerdict(props) {
  return  <p>{props.celsius >= 100 ? 'water boil' : 'water would not boil'}</p>
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
class TemperatureInputSelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(ev) {
    this.setState({ temperature: ev.target.value })
  }

  render() {
    const { temperature } = this.state
    const { scale } = this.props
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
          {/* 子组件自动更新 */}
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    )
  }
}
class TemperatureInputShare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(ev) {
    // setState 只能更新 state
    // this.setState({ temperature: ev.target.value })
    // props 包括 onTemperatureChange
    this.props.onTemperatureChange(ev.target.value)
  }

  render() {
    // const { temperature } = this.state
    const { scale, temperature } = this.props
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
          {/* 子组件自动更新 */}
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    )
  }
}

// utils
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: 101,
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature})
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature})
  }

  render() {
    // mutable state, WTF?
    const { scale, temperature } = this.state
    // 对值进行单位转换
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toFahrenheit)
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toCelsius)
    return (
      // <div>
      //   <TemperatureInput scale='c' />
      //   <TemperatureInput scale='f' />
      // </div>
      <div>
        <TemperatureInputShare scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}  />
        <TemperatureInputShare scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}  />
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  $root
)
