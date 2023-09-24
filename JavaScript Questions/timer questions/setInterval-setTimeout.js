// setTimeout 用于在指定的时间后执行一次回调函数。 setInterval 则是按照指定的时间间隔循环执行回调函数。

const simulateSetInterval = (func, time) => {
  let timer = null;
  const interval = () => {
    return (timer = setTimeout(() => {
      func();
      interval();
    }, time));
  };
  interval();
  return () => clearTimeout(timer);
};

// const cancel = simulateSetInterval(() => {
//   console.log(1);
// }, 300);

// setTimeout(() => {
//   cancel();
// }, 1000);

// setInterval模拟setTimeout
const simulateSetTimeout = (func, time) => {
  let timer = 0;
  timer = setInterval(() => {
    clearInterval(timer);
    func();
  }, time);

  return () => clearInterval(timer);
};

// const cancel2 = simulateSetTimeout(() => {
//   console.log(1);
// }, 1000);

// setTimeout(() => {
//   cancel2();
// }, 1100);
