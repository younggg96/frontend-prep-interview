import { useEffect, useState } from "react";
/**
 * 如果 useEffect 第二个参数数组内的值发生了变化，
 * 那么 useEffect 第一个参数的回调将会被再执行一遍，
 * 这里要注意的useEffect 的返回值函数并不只是再组件卸载的时候执行，
 * 而是在这个 useEffect 被更新的时候也会调用，例如上述 count 发生变化后，
 * useEffect 返回的方法也会被执行
 * @returns example
 */

/**
 * useLayoutEffect 与 useEffect 的API相同，
 * 区别：useEffect 在浏览器渲染后执行，useLayoutEffect 在浏览器渲染之前执行，
 * 由于JS是单线程，所以 useLayoutEffect 还会阻塞浏览器的渲染。
 * 区别就是这，那么应用场景肯定是从区别中得到的，useLayoutEffect 在渲染前执行，
 * 也就是说我们如果有状态变了需要依据该状态来操作DOM，
 * 为了避免状态变化导致组件渲染，然后更新 DOM 后又渲染，给用户肉眼能看到的闪烁，
 * 我们可以在这种情况下使用 useLayoutEffect。
 * 当然这个不只是状态的改变，在任何导致组件重新渲染，
 * 而且又要改变 DOM 的情况下都是 useLayoutEffect 的使用场景。
 * 当然这种场景不多，useLayoutEffect 也不能多用，
 * 且使用时同步操作时长不能过长，不然会给用户带来明显的卡顿。
 */

export const ExampleUseEffect = () => {
  const [count, setCount] = useState(0);
  // let timer = null;
  // 类似于 class 组件的 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    let timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    // setCount(count + 1);

    return () => {
      // 类似 componentWillUnmount
      // unmount events ...
      clearInterval(timer); // 组件卸载、useEffect 更新 移除计时器
    };
  }, [count]);

  return (
    <div>
      {Math.random()}
      <button onClick={() => setCount(count + 1)}>click</button>
      {count}
    </div>
  );
};
