import { createContext, useContext, useMemo, useReducer } from "react";
/**
 * 在上述案例 useReducer 中，我们将函数的参数改为一个对象，
 * 分别有 type 和 payload 两个参数，type 用来决定更新什么数据，
 * payload 则是更新的数据。
 * 写过 react-redux 的同学可能发这个 reducer 与 react-redux 中的
 * reducer 很像，我们借助 react-redux 的思想
 * 可以实现一个对象部分更改的 reducer，
 * 那么我们便可以使用 React Hooks 的 useContext 来实现一个状态管理。
 * @returns example
 */
const store = createContext([]);

export const ExampleUseContext = () => {
  const reducerValue = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case "setName":
          return {
            ...state,
            name: payload,
          };
        case "setAge":
          return {
            ...state,
            age: payload,
          };
      }
    },
    {
      name: "Jace",
      age: 18,
    }
  );
  // const [state, dispatch] = reducerValue;

  // const storeValue = useMemo(() => reducerValue, reducerValue);

  return (
    <store.Provider value={reducerValue}>
      <Child />
    </store.Provider>
  );
};

const Child = () => {
  const [state, dispatch] = useContext(store); // 在子组件中使用
  console.log(state, Math.random());
  return (
    <div>
      {JSON.stringify(state)}{Math.random()}
      <button onClick={() => dispatch({ type: "setName", payload: "John" })}>
        click
      </button>
    </div>
  );
};
