import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'


const $root = document.getElementById('root')
// const name = 'Josh Perez';
// const el = <h1>Hello, {name}, age: { 10 + 8 }</h1>;

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }
// const user = {
//   firstName: 'Harper',
//   lastName: 'Perez',
//   avatarUrl: 'www.baidu.com'
// };

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
// );

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
  return <h1>Hello, {props.name}</h1>;
}

// class组件
class WelcomeClass extends React.Component {
  render() {
    return <h1>Welcome_01 Hello, {this.props.name}</h1>;
  }
}

const el = <WelcomeFunction name="Sara" /> // 入参 {name: 'Sara'}作为props return解析后的模板
ReactDOM.render(
    el,
    $root
)

const el_01 = <WelcomeClass name="Sara" />
ReactDOM.render(
    el_01,
    $root
)

function App() {
    return (
        <div>
            <WelcomeFunction name="Sara" />
            <WelcomeFunction name="Cahal" />
            <WelcomeFunction name="Edite" />
        </div>
    )
}

ReactDOM.render(
    <App />,
    $root
)

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
  );
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
        avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
    },
    text: 'i am a student',
    date: new Date()
}

// 这tm得写多少个属性
ReactDOM.render(
    <Comment author={userObj.author} text={userObj.text} date={userObj.date} />,
    $root
)
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
    );
  }
}

ReactDOM.render(
    // 调用Clock构造函数，初始化this.state，调用setState()更新date
    // React检测到state变更，重新调用render() 从而更新UI
    <Clock />,
    $root
)




