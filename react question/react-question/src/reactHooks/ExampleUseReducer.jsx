import { useReducer } from "react";
/**
 * useReducer 接收两个参数，
 * 第一个是 reducer 函数，通过该函数可以更新 state，
 * 第二个参数为 state 的初始值，是 useReducer 返回的数组的第一个值，
 * 也是在 reducer 函数第一次被调用时传入的一个参数。
 *
 * 在基础用法中，返回一个 dispatch
 * 通过 dispatch 触发不同的 action 来加减 state。
 *
 * 这里既然能传 string action
 * 那么肯定也能传递更复杂的参数来面对更复杂的场景。
 * @returns example
 */
export const ExampleUseReducer = () => {
  const [count, dispatch] = useReducer((count, action) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "subtract":
        return count - 1;
      case "add":
        return count + 1;
    }
  }, 0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch("subtract")}>subtract</button>
      <button onClick={() => dispatch("add")}>add</button>
    </div>
  );
};
