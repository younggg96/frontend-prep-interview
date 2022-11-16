import React from "react";
// 子组件: Child
const Child = (props) => {
  const cb = (msg) => {
    props.callback(msg);
  };
  return <button onClick={() => cb("Hello!!")}>Hello!</button>;
};

// 父组件 Parent
const Parent = () => {
  const callback = (msg) => {
    console.log(msg);
  };
  return <Child callback={callback}></Child>;
};

export default Parent;
