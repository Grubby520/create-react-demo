
import React from 'react'
import ReactDOM from 'react-dom'

import usb from '../assets/images/usb.jpg'



/**
 * 目标：封装获取鼠标位置这个行为，方便其他组件共享它
 */

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <p style={{ position: 'absolute', left: mouse.x, top: mouse.y }}>
        <span>{mouse.x}, {mouse.y}</span>
        <img src={usb} alt="" width="200px" height="200px" />
      </p>
    );
  }
}

// 位置信息和监听事件封装在独立的Mouse组件中
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

export function PortalInstall() {
  ReactDOM.render(< MouseTracker />, document.getElementById('root'))
}
