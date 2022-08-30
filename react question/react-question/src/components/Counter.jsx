import React, { useState, useCallback } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = useCallback(() => setCount((prev) => prev + 1), []);
  const handleDecrease = useCallback(() => setCount((prev) => prev - 1), []);

  return (
    <div>
      <button data-testid="decrement-button" onClick={handleDecrease}>
        -
      </button>
      <button data-testid="increment-button" onClick={handleIncrease}>
        +
      </button>
      <p>clicked: {count}</p>
    </div>
  );
};
