// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }

//   function App() {
//     const isFirstRender = useIsFirstRender()
//     // only true for the first render
//     ...
//   }
import { useEffect, useRef } from "react";

export function useIsFirstRender() {
  // your code here
  const ref = useRef(true);

  useEffect(() => {
    ref.current = false
  }, [])

  return ref.current
}