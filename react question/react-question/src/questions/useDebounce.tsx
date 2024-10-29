import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay: number): T | undefined {
  // your code here
  const [dValue, setDValue] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDValue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    }
  }, [value, delay])

  return dValue;
}
