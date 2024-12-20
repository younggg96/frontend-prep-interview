import { useEffect, useRef } from "react";
export function usePrevious(value) {
  // your code here
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  }, [value]);
  return prevRef.current;
}
