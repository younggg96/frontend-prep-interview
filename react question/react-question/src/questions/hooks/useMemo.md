`useMemo` 是 React 中的一个 Hook，主要用于在计算代价较高的值时进行性能优化。它会在依赖项不变的情况下缓存计算结果，避免每次渲染都重新计算。`useMemo` 返回的值会在依赖项发生变化时重新计算。以下是它的基本用法和一些示例：

### 基本语法

```javascript
const memoizedValue = useMemo(() => {
  // 执行一些复杂的计算
  return computedValue;
}, [dependencies]);
```

- `useMemo` 接收两个参数：
  - 一个函数，用于返回需要缓存的值。
  - 一个依赖数组（dependencies），只有当依赖发生变化时，`useMemo` 才会重新计算。

### 使用场景

1. **优化昂贵的计算**：如复杂的数学计算、大量数据过滤等。
2. **避免不必要的重新渲染**：当传递的值不变时，避免组件重新渲染。

### 示例：过滤列表数据

假设有一个较大的数组，我们需要过滤其中的数据。每次渲染时，过滤操作可能会非常耗费性能，这时可以使用 `useMemo` 进行优化。

```javascript
import React, { useState, useMemo } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [items] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Grape",
    "Kiwi",
  ]);

  // 使用 useMemo 缓存过滤结果
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]); // 只有 query 或 items 改变时才重新计算

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

### 代码说明

- **`filteredItems`**：使用 `useMemo` 缓存过滤后的数据。当 `query` 或 `items` 发生变化时，才会重新计算过滤结果。
- **优化效果**：每次输入框内容变化时，`filteredItems` 的计算仅会在依赖变化时触发，避免不必要的计算，提升性能。

### 注意事项

- **谨慎使用依赖项**：过多依赖会导致频繁的重新计算，失去 `useMemo` 的意义。
- **不要滥用**：`useMemo` 仅在性能优化必要时使用，过度使用可能导致代码可读性下降。

`useMemo` 是 React 中性能优化的重要工具，尤其适合在依赖变化少且计算成本较高的场景中使用。
