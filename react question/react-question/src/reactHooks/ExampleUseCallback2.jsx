import React, { useCallback, useState } from "react";
/**
 * @returns React.Memo 包裹的按钮子组件
 */
const Button = React.memo(({ label, clickHandler, type = "" }) => {
  // 为了方便我们查看该子组件是否被重新渲染，这里增加一行 console.log 代码
  // 当这个 Button 子组件重新渲染时，控制台会打印这条信息。
  console.log(`按钮 (子组件) 渲染了: ${label} ${type}`);
  return <button onClick={clickHandler}>{label}</button>;
});
// 给 React.memo 包裹的组件设置一个 displayName，便于在 React DevTools 中识别
Button.displayName = "MemoizedButton";

export const ExampleUseCallback2 = () => {
  const [age, setAge] = useState(34);
  const [salary, setSalary] = useState(7000);
  // 这个状态与核心逻辑无关，仅用于触发父组件的重新渲染，以便观察子组件的渲染行为
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  // 父组件渲染时，控制台会打印这条信息
  console.log("父组件 ExampleUseCallback2 渲染了");

  // --- 情况1: 不使用 useCallback --- (用于对比学习)
  // 这个函数在每次父组件 ExampleUseCallback2 重新渲染时都会被重新创建。
  // 因此，它的引用每次都会改变。
  const handleAgeIncreaseWithoutCallback = () => {
    setAge(age + 1);
  };

  // 这个函数也一样，每次父组件重新渲染时都会是一个全新的实例。
  const handleSalaryIncreaseWithoutCallback = () => {
    setSalary(salary + 1);
  };

  // --- 情况2: 使用 useCallback --- (用于性能优化)
  // useCallback 会返回该回调函数的一个 memoized (记忆化) 版本。
  // 只有当依赖项数组 [age] 中的 age 发生变化时，这个 memoized 函数才会重新创建。
  // 如果 age 没有变化，即使父组件重新渲染，useCallback 也会返回上一次缓存的函数实例，引用保持不变。
  const handleAgeIncreaseWithCallback = useCallback(() => {
    setAge(age + 1);
  }, [age]); // 依赖项是 age

  // 同理，这个函数只有在依赖项数组 [salary] 中的 salary 发生变化时才会重新创建。
  const handleSalaryIncreaseWithCallback = useCallback(() => {
    setSalary(salary + 1);
  }, [salary]); // 依赖项是 salary

  // 点击按钮时，会更新 unrelatedCounter 状态，从而强制父组件 ExampleUseCallback2 重新渲染。
  const forceParentRender = () => {
    setUnrelatedCounter(c => c + 1);
  };

  return (
    <div>
      <h2><code>useCallback</code> 使用与否的差异演示</h2>
      <p>请打开浏览器控制台查看详细的渲染日志。</p>
      <p>
        当你点击下方的 "强制父组件重新渲染" 按钮时，请特别留意控制台中哪些按钮 (子组件) 打印了新的
        "按钮 (子组件) 渲染了..." 日志信息。
      </p>
      <p>年龄: {age} - 薪水: {salary} - 无关计数器: {unrelatedCounter}</p>

      <button onClick={forceParentRender}>强制父组件重新渲染</button>

      <hr style={{ margin: "20px 0" }} />

      <h3>未使用 <code>useCallback</code> 的按钮</h3>
      <p>这些按钮的回调函数 (<code>clickHandler</code> prop) 在每次父组件重新渲染时都是一个新的函数实例。因此，即使这些按钮本身依赖的数据没有变化，它们也会因为 prop 的变化而重新渲染。</p>
      <Button
        label={`增加年龄 (未使用 useCallback)`}
        clickHandler={handleAgeIncreaseWithoutCallback}
        type="(未使用 useCallback)"
      />
      <Button
        label={`增加薪水 (未使用 useCallback)`}
        clickHandler={handleSalaryIncreaseWithoutCallback}
        type="(未使用 useCallback)"
      />

      <hr style={{ margin: "20px 0" }} />

      <h3>使用了 <code>useCallback</code> 的按钮</h3>
      <p>这些按钮的回调函数 (<code>clickHandler</code> prop) 被 <code>useCallback</code> 包装。只有当它们各自的依赖项 (此例中分别是 <code>age</code> 或 <code>salary</code>) 发生改变时，<code>useCallback</code> 才会返回新的函数实例。如果依赖项未变，即使父组件重新渲染，这些回调函数的引用也会保持不变，从而允许 <code>React.memo</code> 包裹的子组件跳过不必要的渲染。</p>
      <Button
        label={`增加年龄 (使用了 useCallback)`}
        clickHandler={handleAgeIncreaseWithCallback}
        type="(使用了 useCallback)"
      />
      <Button
        label={`增加薪水 (使用了 useCallback)`}
        clickHandler={handleSalaryIncreaseWithCallback}
        type="(使用了 useCallback)"
      />
    </div>
  );
};
