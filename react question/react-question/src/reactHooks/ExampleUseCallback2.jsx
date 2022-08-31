import React, { useCallback, useState } from "react";
/**
 * @returns example
 */
const Button = React.memo(({ label, clickHandler }) => {
  //为了方便我们查看该子组件是否被重新渲染，这里增加一行console.log代码
  console.log(`rendering ... ${label}`);
  return <button onClick={clickHandler}>{label}</button>;
});

export const ExampleUseCallback = () => {
  const [age, setAge] = useState(34);
  const [salary, setSalary] = useState(7000);

  // const clickHandler01 = () => {
  //   setAge(age + 1);
  // };

  // const clickHandler02 = () => {
  //   setSalary(salary + 1);
  // };

  //使用useCallback()包裹住原来的处理函数
  const clickHandler01 = useCallback(() => {
    setAge(age + 1);
  }, [age]);

  //使用useCallback()包裹住原来的处理函数
  const clickHandler02 = useCallback(() => {
    setSalary(salary + 1);
  }, [salary]);

  return (
    <div>
      {age} - {salary}
      <Button label="Bt01" clickHandler={clickHandler01}></Button>
      <Button label="Bt02" clickHandler={clickHandler02}></Button>
    </div>
  );
};
