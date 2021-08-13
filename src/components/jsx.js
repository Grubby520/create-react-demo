/**
 * JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖
 * babel
 * https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG6IToCGAzpwLwBEaTHD6IEAYXQwIAa355EPAHwEAvn0W1OAB3ZhFACQxZEmnXoDucMunoBCWgHptujU7OvGTRQG4iKokA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.12.14&externalPlugins=
 * 
 */
import React from 'react'
import { PhotoStory, VideoStory } from './stories'

function MyButton() {}

// before
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

// compile
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

// before
function Hello_before() {
  return <div class="hello" onClick="() =>{}"><span>Hello <span>world!</span></span></div>;
}

// after
function Hello_after() {
  return /*#__PURE__*/React.createElement("div", {
    class: "hello",
    onClick: "() =>{}"
  }, /*#__PURE__*/React.createElement("span", null, "Hello ", /*#__PURE__*/React.createElement("span", null, "world!")))
}

// 自定义的组件必须首字母大写 CamelCase

// 允许时动态加载组件
const components = {
  photo: PhotoStory,
  video: VideoStory
};

export const Story =  function(props) {
  // JSX 类型可以是大写字母开头的变量
  const SpecificStory = components[props.storyType]
  return (
    <SpecificStory />
  )
}

// 属性展开
function PropertyExpand(props) {
  const { first, last, ...others } = props
  return (
    <div>
      {/* 所有属性下传 */}
      <PhotoStory {...props} />
      {/* 部分下传 */}
      <VideoStory {...others} />
    </div>
  )
}
