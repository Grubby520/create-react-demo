/**
 * Portal: 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
 * Profiler: https://zh-hans.reactjs.org/docs/profiler.html
 */
import React, { Profiler } from 'react'
import ReactDOM from 'react-dom'

class Container extends React.Component {
  render() {
    return (
      <div className="body">
        <div id="app-root">
          <p>app-root</p>
        </div>
        <div id="modal-root">
          <p>modal-root</p>
        </div>
      </div>
    )
  }
}

// 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = 'create-div'
  }

  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    // 当子元素里的按钮被点击时，
    // 这个将会被触发更新父元素的 state，
    // 即使这个按钮在 DOM 中不是直接关联的后代
    this.setState(state => ({
      clicks: state.clicks + 1
    }))
  }

  render() {
    return (
      <div className="parent-cnt" onClick={ this.handleClick }>
        <p>{this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>

        <Modal>
          <Child></Child>
        </Modal>
      </div>
    )
  }
}

function Child() {
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.cb = this.cb.bind(this)
  }

  cb(...params) {
    console.log(params) // ["Parent", "update", 1.02499988861382, 0.7749996148049831, 51446.549999993294, 51447.82499992289, Set(0)
  }

  render() {
    return (
      <Profiler id="Parent" onRender={this.cb}>
        <Parent></Parent>
      </Profiler>
    )
  }
}

export function PortalInstall() {
  ReactDOM.render(< Main />, appRoot)
}
