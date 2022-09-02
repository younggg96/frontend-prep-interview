import { useEffect, useState } from "react";
import { Counter } from "./components/Counter";
import { ExampleUseState } from "./reactHooks/ExampleUseState";
import { ExampleUseReducer } from "./reactHooks/ExampleUseReducer";
import { ExampleUseReducer2 } from "./reactHooks/ExampleUseReducer2";
import { ExampleUseContext } from "./reactHooks/ExampleUseContext";
import { ExampleUseEffect } from "./reactHooks/ExampleUseEffect";
import { useTimeout } from "./questions/useTimeoutHooks/useTimeout";
import { ExampleUseRef } from "./reactHooks/ExampleUseRef";
import { ExampleUseRef2 } from "./reactHooks/ExampleUseRef2";
import { ExampleUseRef3 } from "./reactHooks/ExampleUseRef3";
import { ExampleUseImperativeHandle } from "./reactHooks/ExampleUseImperativeHandle";
import { ExampleUseCallback } from "./reactHooks/ExampleUseCallback2";
import { ExampleUseMemo } from "./reactHooks/ExampleUseMemo";
import { usePrevious } from "./questions/usePreviousHooks/usePrevious"

function App() {
  const [time, setTime] = useState(0);

  // const [count, setCount] = useState(0);
  // const prevCount = usePrevious(count);

  // useTimeout(() => {
  //   console.log("useTimeout hooks");
  // }, 1000);

  return (
    <div className="App">
      <header className="App-header"> Hello world </header>
      {/* <Counter />
      <ExampleUseState />
      <ExampleUseReducer />
      <ExampleUseReducer2 />
      <ExampleUseContext />
      <ExampleUseEffect />
      <ExampleUseRef />
      <ExampleUseRef2 />
      <ExampleUseRef3 />
      <ExampleUseImperativeHandle />
      <ExampleUseCallback /> */}
      <ExampleUseMemo />

      {/* usePrevious hooks */}
      {/* <button onClick = {() => {setCount(count + 1)}}>{`current: ${count}, before: ${prevCount}`}</button> */}
    </div>
  );
}

export default App;
