import { useState } from "react";
/**
 * 此方法会返回两个值：当期状态和更新状态的函数。
 * 效果同 this.state 与 this.setState，
 * 区别是 useState 传入的值并不一定要对象，
 * 并且在更新的时候不会把当前的 state 与旧的 state 合并。
 * @returns example
 */
export const ExampleUseState = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>click</button>
      {count}
    </div>
  );
};
