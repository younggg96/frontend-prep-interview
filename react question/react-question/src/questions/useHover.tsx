import { Ref, useEffect, useRef, useState } from "react";

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }

export function useHover<T extends HTMLElement>(): [
  Ref<T | undefined>,
  boolean
] {
  // your code here
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>();
  useEffect(() => {
    setIsHovered(false);
    const element = ref.current;
    if (!element) return;
    const setYes = () => setIsHovered(true);
    const setNo = () => setIsHovered(false);
    element.addEventListener("mouseenter", setYes);
    element.addEventListener("mouseleave", setNo);
    return () => {
      element.removeEventListener("mouseenter", setYes);
      element.removeEventListener("mouseleave", setNo);
    };
  }, [ref.current]);

  return [ref, isHovered];
}
