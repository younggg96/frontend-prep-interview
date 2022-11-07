## 一、定义
```
useEffect(didUpdate, deps);
const memoizedCallback = useCallback(() => {
  doSomething(params);
}, deps);
const memoizedValue = useMemo(() => computerExpensiveValue(params), deps);
```
deps 是依赖的参数列表，当依赖列表中的任一参数变化时，则重新执行前面的函数。
### 1.1 useEffect
useEffect 一般用于处理状态更新导致的 side effects。虽然说不提倡面向生命周期函数编程，但是在没有熟练掌握 useEffect 的时候，类比 Class Component 的生命周期函数最能帮助我们快速上手。

useEffect 可以看做是 componentDidMount/componentDidUpdate/componentWillUnmount 这三个生命周期函数的替代。

看下官网提供的例子，可以非常全面的展示 useEffect 的使用方式：

import React, { useState, useEffect } from "react";

// 该组件定时从服务器获取好友的在线状态
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    // 在浏览器渲染结束后执行
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    // 在每次渲染产生的 effect 执行之前执行
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };

    // 只有 props.friend.id 更新了才会重新执行这个 hook
  }, [props.friend.id]);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
1.2 useLayoutEffect
useEffect 是官方推荐拿来代替 componentDidMount/componentDidUpdate/componentWillUnmount 这三个生命周期函数的，但是它们并不是完全等价的，useEffect 是在浏览器渲染结束之后才执行的，而这三个生命周期函数是在浏览器渲染之前同步执行的，React 还有一个官方的 hook 是完美等价于这三个生命周期函数的，叫 useLayoutEffect。

useEffect 和 useLayoutEffect 的区别来看一个例子：

const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // 耗时 300 毫秒的计算
    const start = +new Date();
    while (+new Date() - start <= 300) {
      continue;
    }
    if (count === 0) {
      setCount(Math.random());
    }
  }, [count]);

  const handleClick = React.useCallback(() => setCount(0), []);

  return <button onClick={handleClick}>{count}</button>;
};
效果如下：

img

如果换成 useLayoutEffect，得到的效果是：

img

这个例子可以很明显看出 useEffect 和 useLayoutEffect 之间的区别，useEffect 是在浏览器重绘之后才异步执行的，所以点击按钮上的数字会先变成 0，再变成一个随机数；而 useLayoutEffect 是在浏览器重绘之前同步执行的，所以两次 setCount 合并到 300 毫秒后的重绘里了。

img

因为 useEffect 不会阻塞浏览器重绘，而且平时业务中我们遇到的绝大多数场景都是时机不敏感的，比如取数、修改 dom、事件触发/监听...,所以首推使用 useEffect 来处理 side effects，性能上表现的更好一些。

didUpdate 是一个包含命令式，且可能有副作用代码的函数

didUpdate 是组件渲染成功且 deps 依赖参数发生变化时执行的函数。

didUpdate 可以没有返回值，只是执行 didUpdate 的内容。

但是当 didUpdate 有返回值的时候，返回值必须是一个可执行的函数，目的是用于清除 didUpdate 执行过程中产生的订阅或者计时器等资源。同时如果 didUpdate 多次触发，则在每次重新执行前都会先执行返回的可执行函数。（官方称之为清除 Effect）

useEffect(() => {
  const timer = setInterval(() => {
    console.log("effect");
  }, 1000);
  return () => {
    // 清除定时器
    clearInterval(timer);
  };
});
1.2 useCallback
有人可能误认为 useCallback 可以用来解决创建函数造成的性能问题，其实恰恰相反。单个组件来看，useCallback 只会更慢，因为 inline 函数是无论如何都会创建的，还增加了 useCallback 内部对 inputs 变化的检测。

function A() {
  const cb = () => {}; /* 创建了 */
}
function B() {
  const cb = React.useCallback(() => {} /* 还是创建了 */, [a, b]);
}
useCallback 的真正目的是在于缓存每次渲染时 inline callback 的实例，这样方便配合上子组件的 shouldComponentUpdate 或者 React.memo 起到减少不必要的渲染的作用。需要注意的是 React.memo 和 React.useCallback 一定要配对使用。缺了一个可能导致性能不升反降。毕竟无意义的浅比较也是消耗那么一点点的性能。

返回一个 memoized 的回调函数，即返回一个函数的句柄，等同于函数的变量，因此 useCallback 的作用在于利用 memoize 减少无效的 re-render，来达到性能优化的作用。

1.3 useMemo
useMemo 是拿来保持一个对象引用不变的。useMemo 和 useCallback 都是 React 提供来做性能优化的。比起 classes，Hooks 给了开发者更高的灵活度和自由，但是对开发者要求也更高了，因为 Hooks 使用不恰当很容易导致性能问题。

返回一个 memoized 值，useMemo 函数每当 deps 发生变化时都会调用 computeExpensiveValue 的内容，这是与 useCallback 最大的不同，useCallback 不执行 doSomething 的内容，只是重新刷新函数句柄。

句柄
官方上有这样一个等式：useCallback(fn,deps) 相当于 useMemo(()=>fn,deps)。就是 deps 发生变化时，useCallback 返回的是一个可执行的 fn 的句柄，而 useMemo 则是执行()=>fn，但是因为返回的是 fn 函数，因此当调用这种时，其实执行的是相同的 fn 函数内容。