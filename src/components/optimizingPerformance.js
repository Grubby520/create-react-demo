/**
 * 性能优化
 */
import React from 'react'

/**
 * Brunch
 * # 如果你使用 npm
  npm install --save-dev terser-brunch

  # 如果你使用 Yarn
  yarn add --dev terser-brunch

  # 创建生产构建
  $ brunch build -p

 */

/**
 * Browserify
 * # 如果你使用 npm
  npm install --save-dev envify terser uglifyify

  # 注意顺序

 */

/**
 * 
 * Rollup
 # 如果你使用 npm
 npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

 * Chrome Performance
 # 注意 这玩意儿如何解读组件是如何挂载、更新以及卸载的

 * 虚拟化长列表
 # 使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM 节点的数量
 

 */

class ListOfWords extends React.PureComponent {
  render() {
    console.log(this.props.words)
    return <div>{this.props.words.join(',')}</div>;
  }
}

export class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    // const words = this.state.words;
    // words.push('marklar');
    // this.setState({words: words});

    // better 
    const random = Math.random().toFixed(2)
    this.setState(state => ({
      words: [...state.words, random],
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} >Click Me</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
