import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * 使用 useImperativeHandle 钩子可以自定义将子组件中任何的变量，挂载到 ref 上。
 * React.forwardRef 方法可以让组件能接收到 ref ，然后再使用或者透传到更下层
 * @returns example
 */
const Child = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [value, setValue] = useState(1);

  useImperativeHandle(ref, () => ({
    value, // 内部变量
    setValue, // 方法
    input: inputRef.current, // Ref
  }));

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  return <input value={value} ref={inputRef} onChange={changeHandler} />;
});

export const ExampleUseImperativeHandle = () => {
  const ref = useRef();
  const showChild = () => {
    ref.current.setValue(8);
  };
  return (
    <div>
      <p onClick={showChild} style={{ marginTop: "20px" }}>
        这是子组件
      </p>
      <Child ref={ref} />
    </div>
  );
};
