import { useState } from "react";

// It is quite common to see switches and checkboxes in web apps.

// Implement useToggle() to make things easier

// function App() {
//   const [on, toggle] = useToggle()
//   ...
// }

export function useToggle(on: boolean): [boolean, () => void] {
  // your code here
  const [flag, setFlag] = useState<boolean>(on);

  const toggle = () => setFlag(!flag);

  return [flag, toggle]
}
