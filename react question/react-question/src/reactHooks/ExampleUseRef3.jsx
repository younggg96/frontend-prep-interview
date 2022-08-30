import { useEffect, useRef, useState } from "react";

/**
 * 
 * 两种实现方式对比：
  1、两种实现方式最主要的差异地方在于 如何创建组件内对计时器的引用。
  2、两种创建引用的方式，分别是：用useState创建的timer、用useRef创建的timerRef
  3、在使用setInterval时，相对来说timerRef.current更加好用简单，结构清晰，不需要像 setTimer那样需要再多1层包裹。
  4、timer更像是一种react对计时器的映射，而timerRef直接就是真实DOM中计时器的引用，
  timerRef能够调用更多的原生html中的JS方法和属性。

  结论：
  1、如果需要对渲染后的DOM节点进行操作，必须使用useRef。
  2、如果需要对渲染后才会存在的变量对象进行某些操作，建议使用useRef。
 * @returns example
 */

export const ExampleUseRef3 = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null); //先定义一个timerRef引用变量，用于“勾住”useEffect中通过setIntervale创建的计时器

  useEffect(() => {
    //将timerRef.current与setIntervale创建的计时器进行“挂钩”
    timerRef.current = setInterval(() => {
      setCount((prevData) => prevData + 1);
    }, 1000);
    return () => {
      //通过timerRef.current，清除掉计时器
      clearInterval(timerRef.current);
    };
  }, []);

  const clickHandler = () => {
    //通过timerRef.current，清除掉计时器
    clearInterval(timerRef.current);
  };

  return (
    <div>
      {count}
      <button onClick={clickHandler}>stop</button>
    </div>
  );

  // const [count,setCount] = useState(0);
  // const [timer,setTimer] = useState(null); //单独声明定义timer，目的是为了让组件内所有地方都可以访问到timer

  // useEffect(() => {
  //   //需要用setTimer()包裹住 setInterval()
  //   setTimer(setInterval(() => {
  //       setCount((prevData) => {return prevData +1});
  //   }, 1000));
  //   return () => {
  //     //清除掉timer
  //     clearInterval(timer);
  //   }
  // },[]);

  // const clickHandler = () => {
  //   //清除掉timer
  //   clearInterval(timer);
  // };

  // return (
  //   <div>
  //       {count}
  //       <button onClick={clickHandler} >stop</button>
  //   </div>
  // )
};
