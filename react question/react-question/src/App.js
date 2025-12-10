import { useEffect, useState } from "react";
import { Counter } from "./components/Counter";
import { ExampleUseState } from "./reactHooks/ExampleUseState";
import { ExampleUseReducer } from "./reactHooks/ExampleUseReducer";
import { ExampleUseReducer2 } from "./reactHooks/ExampleUseReducer2";
import { ExampleUseContext } from "./reactHooks/ExampleUseContext";
import { ExampleUseEffect } from "./reactHooks/ExampleUseEffect";
import { useTimeout } from "./questions/useTimeout";
import { ExampleUseRef } from "./reactHooks/ExampleUseRef";
import { ExampleUseRef2 } from "./reactHooks/ExampleUseRef2";
import { ExampleUseRef3 } from "./reactHooks/ExampleUseRef3";
import { ExampleUseImperativeHandle } from "./reactHooks/ExampleUseImperativeHandle";
import { ExampleUseCallback } from "./reactHooks/ExampleUseCallback";
import { ExampleUseMemo } from "./reactHooks/ExampleUseMemo";
import { usePrevious } from "./questions/usePrevious";
import Parent from "./questions/Communicate";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import FileSystem from "./components/FileSystem/FileSystem";
import { ExampleUseCallback2 } from "./reactHooks/ExampleUseCallback2";
import SimpleImages from "./components/SimpleImages"

const UseHookComponents = () => {
  const [time, setTime] = useState(0);
  // const [count, setCount] = useState(0);
  // const prevCount = usePrevious(count);

  // useTimeout(() => {
  //   console.log("useTimeout hooks");
  // }, 1000);
  return (
    <>
      {/* <ExampleUseCallback />
      <ExampleUseCallback2 />
      <ExampleUseMemo /> */}
      {/* <header className="App-header"> Hello world </header> */}
      {/* <Counter /> */}
      {/* <ExampleUseEffect /> */}
      {/* <ExampleUseState />
      <ExampleUseReducer />
      <ExampleUseReducer2 />
      <ExampleUseContext />
      <ExampleUseRef />
      <ExampleUseRef2 />
      <ExampleUseRef3 />
      <ExampleUseImperativeHandle />
      <ExampleUseCallback /> */}
      {/* <ExampleUseMemo /> */}

      {/* usePrevious hooks */}
      {/* <button onClick = {() => {setCount(count + 1)}}>{`current: ${count}, before: ${prevCount}`}</button> */}

      {/* <Parent /> */}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <SimpleImages />
      {/* <UseHookComponents /> */}
      {/* <TicTacToe /> */}
      {/* <FileSystem /> */}
    </div>
  );
}

export default App;
