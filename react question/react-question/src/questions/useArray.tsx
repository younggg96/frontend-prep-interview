import React, { useState } from 'react'

type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}

export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [arrValue, setArrValue] = useState(initialValue);

  const push = React.useCallback((item: T) => {
    setArrValue((prev) => [...prev, item]);
  }, []);

  const removeByIndex = React.useCallback((index: number) => {
    setArrValue(prev => {
      const newVal = [...prev];
      newVal.splice(index, 1);
      return newVal;
    })
  }, [])

  return { value: arrValue, push, removeByIndex }
}