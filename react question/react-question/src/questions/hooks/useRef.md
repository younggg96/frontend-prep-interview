`useRef` 是 React 中的一个 Hook，通常用于管理不需要触发重新渲染的可变数据，以下是一些常见的用法：

1. **访问 DOM 元素**：`useRef` 可以用于直接获取 DOM 元素的引用，通常用于获取或操作页面上的元素，而不需要通过 `document.querySelector` 等方法。例如：

   ```javascript
   import { useRef, useEffect } from 'react';

   function App() {
       const inputRef = useRef(null);

       useEffect(() => {
           inputRef.current.focus(); // 页面加载时让输入框自动获取焦点
       }, []);

       return <input ref={inputRef} type="text" />;
   }
   ```

2. **保存组件状态而不触发重渲染**：当你需要保存某些数据，但不希望这些数据的改变引发组件重新渲染时，可以使用 `useRef`。比如在计时器中保存计数器的引用：

   ```javascript
   import { useRef, useState, useEffect } from 'react';

   function Timer() {
       const [count, setCount] = useState(0);
       const timerRef = useRef(null);

       useEffect(() => {
           timerRef.current = setInterval(() => {
               setCount((prevCount) => prevCount + 1);
           }, 1000);

           return () => clearInterval(timerRef.current);
       }, []);

       return <div>{count}</div>;
   }
   ```

3. **保存前一个渲染的值**：如果你需要追踪前一个渲染的某个值，可以通过 `useRef` 来实现。这样可以在每次渲染时保存一个新的值，而不影响当前渲染的值：

   ```javascript
   import { useRef, useEffect } from 'react';

   function App({ value }) {
       const prevValue = useRef();

       useEffect(() => {
           prevValue.current = value; // 每次渲染时更新 ref
       });

       return (
           <div>
               <p>当前值: {value}</p>
               <p>上一次的值: {prevValue.current}</p>
           </div>
       );
   }
   ```

4. **处理防抖或节流**：对于需要防抖或节流的函数，`useRef` 可以保存定时器的 ID 或上次调用的时间，以防止重复调用。

5. **实现类组件中的实例变量功能**：`useRef` 可以代替类组件中的实例变量来存储组件的实例数据，从而在函数组件中模拟“实例变量”。

这些是 `useRef` 的一些典型用法，通常是在需要持久化数据而不影响渲染性能时才会使用它。