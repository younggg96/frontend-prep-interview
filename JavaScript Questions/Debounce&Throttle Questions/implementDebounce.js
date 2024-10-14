// const debounce = (fn, t) => {
//   let delay = t || 500;
//   let timer;
//   return function () {
//     let args = arguments;
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       timer = null;
//       fn.apply(this, args);
//     }, delay);
//   };
// };

const debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};

function debounce2(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, delay);
  };
}


// 如果不使用 apply 会怎样？
// 假设直接使用 func(args) 或 func() 来调用原始函数：

// 如果直接使用 func()，则无法传递参数，导致无法实现可配置的调用。
// 如果直接 func(args)，则所有参数会被当作一个整体的数组传递，而不是分别传递每个参数。
// 此外，也无法保留 this 上下文，可能导致 func 中的 this 与实际调用环境不符，从而引发错误或意外行为。
// 因此，使用 apply 可以在调用时保留完整的参数和上下文，确保 debounce 封装的函数执行结果与直接调用 func 的结果一致


const debounce3 = (fn, delay) => {
  let timer = null;
  return function(...args) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay)
  }
}