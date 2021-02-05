import React from 'react'
/**
 * ref DOM引用
 * refs转发到子组件
 */
// 入参 props, ref
// 第二参数接收 ref (只有使用React.forwardRef 定义组件才有)
const FancyButton = React.forwardRef((props, ref) => {

  return (
    // JSX的ref属性 ，ref挂载完成， ref.current指向 <button> DOM 节点
    <button ref={ref} {...props} className="fancy-button" id="fancy-button">
      {props.children}
    </button>
  )
})

export default FancyButton
