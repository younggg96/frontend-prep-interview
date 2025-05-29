import { useCallback, useState, memo } from "react";
/**
 * useCallback 的作用是"勾住"组件属性中某些处理函数，返回该函数的一个 memoized (记忆化) 版本。
 * 只有当它的依赖项数组中的某个依赖项发生变化时，它才会重新计算并返回新的函数实例。
 *
 * 为什么需要 useCallback？
 * 在 JavaScript 中，函数是对象。因此，在组件的每次渲染中，如果在组件内部直接定义函数，
 * 即使函数体完全相同，也会被认为是新的函数对象。
 *
 * const handleClick = () => { console.log("Clicked!"); };
 * // 在每次父组件渲染时，handleClick 都是一个新的函数引用。
 *
 * 当这样的函数作为 prop 传递给子组件时，即使子组件被 React.memo 包裹或者有自定义的
 * shouldComponentUpdate 逻辑，子组件也会因为接收到的 prop (函数) 的引用变化而重新渲染。
 * 这可能导致不必要的性能开销。
 *
 * useCallback(fn, deps) 的工作原理：
 * - fn: 你想要 memoize 的函数。
 * - deps: 一个依赖项数组。React 会比较这个数组中的每一项。如果在后续的渲染中，
 *   依赖项数组中的任何一项发生了变化 (使用 Object.is 比较)，useCallback 就会返回一个新的 fn 函数实例。
 *   如果依赖项没有变化，它会返回上一次渲染时缓存的函数实例。
 * - 如果你传入一个空数组 `[]` 作为依赖项，那么返回的函数实例将永远不会改变。
 * - 如果你不传入依赖项数组 (即 `useCallback(fn)` )，那么每次渲染都会返回新的函数实例，等同于没有使用 useCallback。
 *
 * 何时使用 useCallback？
 * 1. 将回调函数传递给经过优化的子组件 (例如，使用 React.memo 包裹的组件)。
 *    这是 useCallback 最常见的用例。它可以防止因为父组件重新渲染导致子组件不必要的重新渲染。
 * 2. 当一个函数作为依赖项传递给其他 Hook 时 (例如 useEffect, useMemo)。
 *    useCallback(() => { doSomething(a, b); }, [a, b]);
 *    useEffect(() => {
 *      const fn = () => { doSomething(a, b); }; // 这个 fn 在每次渲染时都是新的
 *      fn();
 *    }, [a, b]); // 如果 doSomething, a, b 没有变，但 fn 依然会重新创建，可能导致 useEffect 不必要的执行
 *
 *    使用 useCallback:
 *    const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);
 *    useEffect(() => {
 *      memoizedCallback();
 *    }, [memoizedCallback]); // 现在 useEffect 只有在 memoizedCallback 真正改变时才会执行
 *
 * 注意事项：
 * - 不要过度使用 useCallback。如果一个函数没有作为 prop 传递给优化的子组件，或者没有作为其他 Hook 的依赖项，
 *   那么使用 useCallback 可能带来的性能提升微乎其微，甚至可能因为额外的比较和内存占用而产生负面影响。
 * - 依赖项数组至关重要。务必确保所有在回调函数内部使用到的、并且可能在组件生命周期内发生变化的外部变量都包含在依赖项数组中。
 *   如果遗漏了依赖项，回调函数可能会捕获到过时的闭包值，导致 bug。
 *
 * 与 useMemo 的区别：
 * - useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。
 * - useCallback 用于 memoize 函数本身。
 * - useMemo 用于 memoize 计算结果。
 *
 * 示例场景分析：
 * 下面的例子演示了 useCallback 如何与 React.memo 配合，防止子组件不必要的重新渲染。
 */

// 1. 创建一个子组件，并用 React.memo 包裹
// React.memo 会对 props 进行浅比较。如果 props 没有改变，它会跳过重新渲染组件，直接复用最近一次渲染的结果。
const MemoizedButton = memo(({ onClick, children, id }) => {
  console.log(`Rendering MemoizedButton ${id}`);
  return <button onClick={onClick}>{children}</button>;
});
// 为 MemoizedButton 设置一个 displayName，便于在 React DevTools 中识别
MemoizedButton.displayName = "MemoizedButton";

export const ExampleUseCallback = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false); // 用于触发父组件重新渲染的另一个状态

  console.log("Rendering ExampleUseCallback (Parent)");

  // 当 ExampleUseCallback 重新渲染时（例如因为 otherState 改变）：
  // - 如果没有 useCallback，incrementWithLog 每次都会是一个新的函数实例。
  // - 这将导致 MemoizedButton (即使被 memo 包裹) 重新渲染，因为它的 onClick prop 改变了。

  // 使用 useCallback:
  // incrementWithLog 函数只有在 count 改变时才会重新创建。
  // 如果 ExampleUseCallback 因为 otherState 改变而重新渲染，但 count 没有变，
  // incrementWithLog 仍然是上一次缓存的那个函数实例。
  // 因此，MemoizedButton 的 onClick prop 没有改变，React.memo 会阻止它重新渲染。
  const incrementWithLog = useCallback(() => {
    console.log("Button clicked, current count:", count);
    setCount(c => c + 1); // 使用函数式更新，可以避免在依赖中加入 setCount (虽然 setCount 本身是稳定的)
                           // 更重要的是，如果回调逻辑复杂且不直接依赖 count 的当前值，
                           // 而是基于前一个状态进行计算，这样更安全。
                           // 但在这个简单例子中，依赖 [count] 是正确的，因为 console.log(count) 用到了它。
  }, [count]); // 依赖项是 count

  // 这个回调函数没有依赖项，所以它只会在组件首次渲染时创建一次。
  // 之后每次 ExampleUseCallback 重新渲染，getCachedHandler 都会是同一个函数引用。
  const getCachedHandler = useCallback(() => {
    console.log("This handler is cached and won\'t change unless dependencies (none here) change.");
    // 假设这个函数执行一些与 count 或 otherState 无关的通用操作
  }, []); // 空依赖数组，函数永不改变


  // 这个函数没有使用 useCallback，它会在每次 ExampleUseCallback 重新渲染时都创建一个新的实例。
  const nonMemoizedHandler = () => {
    console.log("This handler is recreated on every render of ExampleUseCallback.");
    // 即使这个函数的内容很简单，并且不依赖任何 state 或 prop，
    // 它作为 prop 传递给 MemoizedButton 也会导致其重新渲染。
  };

  return (
    <div>
      <h2>ExampleUseCallback Demo</h2>
      <p>Count: {count}</p>
      <p>
        Open your browser console to see rendering logs.
        <br />
        Notice how `MemoizedButton with useCallback` only re-renders when `count` changes,
        <br />
        while `MemoizedButton without useCallback` re-renders whenever the parent re-renders.
      </p>

      {/* 这个按钮的点击处理函数是 memoized 的 */}
      <MemoizedButton onClick={incrementWithLog} id="with-useCallback">
        Increment Count (Memoized Handler for Button)
      </MemoizedButton>

      <br />
      <br />

      {/* 这个按钮的点击处理函数也是 memoized 的，且没有依赖 */}
      <MemoizedButton onClick={getCachedHandler} id="with-useCallback-no-deps">
        Cached Handler (No Dependencies)
      </MemoizedButton>

      <br />
      <br />

       {/* 这个按钮的点击处理函数没有 memoized */}
      <MemoizedButton onClick={nonMemoizedHandler} id="without-useCallback">
        Non-Memoized Handler (Triggers Child Re-render)
      </MemoizedButton>

      <hr style={{ margin: "20px 0" }} />

      <button onClick={() => setCount(count + 1)}>
        Increment Count Directly (Re-renders Parent & Affects Memoized Button if count is a dependency)
      </button>
      <br />
      <br />
      <button onClick={() => setOtherState(s => !s)}>
        Toggle Other State (Re-renders Parent)
      </button>
      <p>Other State: {otherState.toString()}</p>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee' }}>
        <h4>深入理解:</h4>
        <div>
          <strong>关键点:</strong> <code>useCallback</code> 和 <code>React.memo</code> 是好搭档。
          <code>useCallback</code> 确保传递给子组件的函数 prop 在其依赖未变时保持引用稳定，
          <code>React.memo</code> 则利用这个稳定的 prop 来避免不必要的子组件渲染。
        </div>
        <div>
          <strong>依赖数组 (<code>deps</code>):</strong> 这是 <code>useCallback</code> 的灵魂。
          <ul>
            <li>如果回调函数中使用了任何在组件作用域内定义的变量 (props, state, 或其他自定义 hook 的返回值)，
                并且这些变量的值可能会改变，那么它们<strong>必须</strong>被包含在依赖数组中。</li>
            <li>如果遗漏依赖项，回调函数会捕获到旧的闭包值，导致意想不到的行为和 bug。
                例如，在 <code>incrementWithLog</code> 中，如果我们不把 <code>count</code> 放入依赖数组，
                那么即使 <code>count</code> 的值更新了，<code>console.log(count)</code> 和 <code>setCount(count + 1)</code>
                仍然会使用初次渲染时的 <code>count</code> 值。</li>
            <li>ESLint 的 <code>eslint-plugin-react-hooks</code> 插件 (特别是 <code>exhaustive-deps</code> 规则)
                可以帮助你检查并提示遗漏的依赖项。强烈建议开启并遵循此规则。</li>
          </ul>
        </div>
        <p>
          <strong>函数式更新 (Functional Updates for setState):</strong>
          在 <code>{"setCount(c => c + 1)"}</code> 中，我们使用了函数式更新。
          这意味着我们传递给 <code>setCount</code> 的是一个函数，这个函数接收前一个状态 <code>c</code> 作为参数，并返回新的状态。
          这样做的好处是，我们不需要在回调函数的依赖数组中包含 <code>count</code> 来获取其最新值以计算下一个状态。
          然而，在我们的 <code>incrementWithLog</code> 示例中，由于我们还在 <code>console.log(count)</code> 中直接使用了 <code>count</code>，
          所以 <code>count</code> 仍然是必需的依赖项。如果回调函数仅用于更新状态而不读取它 (例如 <code>{"() => setCount(c => c + 1)"}</code>)，
          那么可以将 <code>count</code> 从依赖项中移除，并将依赖项设为 <code>[]</code> (如果回调函数不依赖其他任何东西)。
        </p>
        <p>
          <strong>总结:</strong> 谨慎使用 <code>useCallback</code>。它是一种优化工具，
          主要用于传递给 memoized 子组件的回调，或作为其他 hooks (如 <code>useEffect</code>) 的依赖项。
          在不需要的场景下使用它可能会引入不必要的复杂性。
        </p>
      </div>
    </div>
  );
};

// ***上面的示例伪代码仅仅是为了演示useCallback的使用方法，实际组件运用中，如果父组件中只有1个子组件，那其实完全没有必要使用useCallback。
// 只有父组件同时有多个子组件时，或者一个回调函数被作为依赖项传递给 useEffect/useMemo 等，才有必要去做性能优化，
// 防止某一个子组件引发的重新渲染也导致其他子组件跟着重新渲染，或者防止 useEffect/useMemo 不必要地重复执行。
// 更准确地说，useCallback 的主要目的是在依赖项不变的情况下，保持函数的引用不变。
