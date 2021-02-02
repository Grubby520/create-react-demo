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

// ReactDOM.render(
//   <Calculator />,
//   $root
// )


//  11. 组合 & 继承 ------------------------------
// \children\ 特殊的prop 类比v-slot=’slotName‘
function FancyBorder(props) {
  return (
    <div className="container">
      <p>我是FancyBorder函数组件</p>
      <div className={'FancyBorder FancyBorder-' + props.color}>
        <p>下面是插入的 children prop的slot组件：</p>
        {props.children}
      </div>
    </div>
  )
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}

// 类比具名插槽 指定prop的slotName
// 放在内容里面，插入后会用一个div包裹起来
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <p>i am Contacts</p>
  )
}

function Chat() {
  return (
    <p>i am Chat</p>
  )
}
// 放在组件的属性上 作为props插入一个子组件
function MainPane() {
  return (
    <SplitPane 
      left = {
        <Contacts />
      }
      right = {
        <Chat />
      }
    >
    </SplitPane>
  )
}

// ReactDOM.render(
//   <WelcomeDialog />,
//   $root
// )

// ReactDOM.render(
//   <MainPane />,
//   $root
// )

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}
// 适用class，插入内容的state还是在定义的父组件中维护
// 灵活得有点可怕，这层层嵌套之后
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    console.log(`Welcome aboard, ${this.state.login}!`);
  }
}

// ReactDOM.render(
//   <SignUpDialog />,
//   $root
// )

// 12. 完整的demo，组件拆分哲学 ---------------------

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)
    // wtf: 所有数据都该在state一个容器里? 每次都解构?
    this.state = {
      name: '',
      stocked: false,
      sportingGoods: [],
      electronicsGoods: []
    }
    this.handleQuerySearch = this.handleQuerySearch.bind(this)
  }

  componentDidMount() {
    this.handleQuerySearch()
  }

  handleQuerySearch(key, value) {
    this.setState({ [key]: value })
    this.APIGetTableData()
      .then(res => {
        const { sportingGoods = [], electronicsGoods = [] } = this.filterTableData(res)
        this.setState({
          sportingGoods,
          electronicsGoods
        })
      })
  }

  filterTableData(res) {
    let { sportingGoods = [], electronicsGoods = [] } = res
    sportingGoods = sportingGoods.filter(good => (this.state.stocked ? good.stocked : true) && (good.name.indexOf(this.state.name) !== -1))
    electronicsGoods = electronicsGoods.filter(good => (this.state.stocked ? good.stocked : true) && (good.name.indexOf(this.state.name) !== -1))
    return {
      sportingGoods,
      electronicsGoods
    }
  }

  APIGetTableData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          sportingGoods: [
            {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
            {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
            {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"}
          ],
          electronicsGoods: [
            {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
            {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
            {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
          ]
        })
      }, 300)
    })
  }

  render() {
    const { name, sportingGoods, electronicsGoods } = this.state
    return (
      <div class="product-container">
        <SearchBar name={name} onTemperatureChange={this.handleQuerySearch} />
        <p>{name}</p>
        <ProductTable sportingGoods={sportingGoods} electronicsGoods={electronicsGoods} />
      </div>
    )
  }
}

class SearchBar extends React.Component {
  handleChange(key, ev) {
    console.log(ev)
    console.log(key)
    const value = key === 'name' ? ev.target.value : ev.target.checked
    this.props.onTemperatureChange(key, value)
  }

  render() {
    const { name, stocked } = this.props
    return (
      <div class="search-bar">
        <div class="item-content">
          <input type="text" value={name} onChange={this.handleChange.bind(this, 'name')}></input>
        </div>
        <div class="item-content">
          <input type="checkbox" value={stocked} onChange={this.handleChange.bind(this, 'stocked')}></input>
          Only show products in stocked
        </div>
      </div>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const { sportingGoods, electronicsGoods } = this.props
    return (
      <div class="product-table">
        <div class="sporting-table">
          <ProductCategoryRow sportingGoods={sportingGoods} />
        </div>
        <div class="elect-table">
          <ProductRow electronicsGoods={electronicsGoods} />
        </div>
      </div>
    )
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    const { sportingGoods = [] } = this.props
    const list = sportingGoods.map(good => (
      <tr key={good.name}>
        <td>{good.name}</td>
        <td>{good.price}</td>
      </tr>
    ))
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { list }
        </tbody>
      </table>
    )
  }
}

class ProductRow extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { electronicsGoods = [] } = this.props
    const list = electronicsGoods.map(good => (
      <tr key={good.name}>
        <td>{good.name}</td>
        <td>{good.price}</td>
      </tr>
    ))
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { list }
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(
  <FilterableProductTable />,
  $root
)
