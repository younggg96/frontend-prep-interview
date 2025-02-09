`debounce` 函数的作用是**限制函数的执行频率**，确保某个函数在**指定的时间间隔内**只执行**一次**，常用于**防止抖动（debouncing）**，比如：

- 搜索输入框实时查询（防止频繁请求后端）
- 浏览器窗口调整（防止频繁触发 `resize` 事件）
- 滚动事件（防止频繁执行 `scroll` 监听器）

## 1. 基本实现（JavaScript 版）
最基本的 `debounce` 实现使用 `setTimeout`：
```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```
### 解释：
- 每次调用 `debounce` 生成的新函数时，都会**清除之前的 `setTimeout`**，然后重新启动一个新的定时器。
- 只有在**一定时间内不再触发**，`fn` 才会执行。

### 使用示例：
```javascript
function handleInput(event) {
  console.log('Search:', event.target.value);
}

const debouncedInput = debounce(handleInput, 500);

document.getElementById('search').addEventListener('input', debouncedInput);
```
**效果：**
- 只有在**用户停止输入 500ms** 后，才会触发 `handleInput`。

---

## 2. 立即执行（leading edge）模式
默认 `debounce` 是在**延迟时间后执行**，但有时我们希望**立即执行一次**，然后等待冷却时间。

### 改进版：
```javascript
function debounce(fn, delay, immediate = false) {
  let timer;
  return function (...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}
```
### 使用：
```javascript
const debouncedLog = debounce(() => console.log('Triggered!'), 1000, true);
window.addEventListener('scroll', debouncedLog);
```
**效果：**
- 立即执行 `console.log('Triggered!')`
- 后续 1000ms 内的 `scroll` 事件都不会触发

---

## 3. React 中使用 `debounce`
在 React 组件中，我们可以使用 `useCallback` 结合 `lodash.debounce`（或者手写 `debounce`）。

### 使用 `lodash.debounce`
```tsx
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

function SearchBox() {
  const handleSearch = useCallback(
    debounce((query) => {
      console.log('Search for:', query);
    }, 500),
    []
  );

  return <input type="text" onChange={(e) => handleSearch(e.target.value)} />;
}
```
### 关键点：
- `useCallback` 确保 `debounce` 版本的 `handleSearch` 不会在组件重新渲染时变化。
- `debounce` 确保 `handleSearch` 只在用户停止输入 500ms 后执行。

---

## 4. TypeScript 版本
如果你在 **TypeScript** 项目中使用 `debounce`：
```ts
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const callNow = immediate && !timer;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) func(...args);
    }, delay);

    if (callNow) func(...args);
  };
}
```
### 使用：
```ts
const log = debounce((msg: string) => console.log(msg), 500);
log('Hello'); // 500ms 后触发
```

---

## 5. `debounce` vs `throttle`
| 对比点 | `debounce` | `throttle` |
|--------|-----------|-----------|
| 触发机制 | **等待一段时间后执行**（期间多次触发会重置计时器） | **在指定时间间隔内最多执行一次** |
| 场景 | **防止频繁触发的操作**（输入框、窗口调整） | **限制执行频率**（滚动监听、按钮防连点） |
| 代码实现 | `setTimeout` | `setTimeout` 或 `Date.now()` |

如果你要控制**执行频率**，而不是等用户停止输入，应该使用 `throttle`。

---

## 6. 结论
- `debounce` 适用于 **防止某个操作频繁触发**，如输入搜索框、窗口调整。
- 可以选择 **延迟执行** 或 **立即执行一次后进入冷却期**。
- 在 React 组件中，可以用 `useCallback` 搭配 `lodash.debounce` 来优化性能。
- `debounce` 和 `throttle` 适用于不同场景，**输入框用 `debounce`，滚动监听用 `throttle`**。