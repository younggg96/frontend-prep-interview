import React, { useState, useCallback } from "react";

const ChildLess = (props) => {
  return (
    <button data-testid="decrement-button" onClick={props.handleDecrease}>
      -
    </button>
  )
}
const ChildMore = (props) => {
  return (
    <button data-testid="decrement-button" onClick={props.handleIncrease}>
      +
    </button>
  )
}

export const Counter = () => {
  const [count, setCount] = useState(0);
  // const handleIncrease = useCallback(() => setCount((prev) => prev + 1), []);
  // const handleDecrease = useCallback(() => setCount((prev) => prev - 1), []);
  const handleIncrease = () => {
    if(count >= 0 && count < 5) {
      setCount(count + 1);
    }
  }
  const handleDecrease = () => {
    if(count > 0 && count <= 5) {
      setCount(count - 1);
    }
  }


  return (
    <div>
      <ChildLess handleDecrease={handleDecrease}/>
      <p>clicked: {count}</p>
      <ChildMore handleIncrease={handleIncrease}/>
    </div>
  );
};
