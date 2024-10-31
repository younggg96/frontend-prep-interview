import React from 'react'

export function useClickOutside(callback: () => void) {
  // your code here
  const ref = React.useRef();

  const onClickHandler = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', onClickHandler)

    return () => {
      document.removeEventListener('click', onClickHandler);
    }
  })

  return ref;
}