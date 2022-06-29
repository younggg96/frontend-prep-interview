// const throttle = (func, wait) => {
//     let waiting = false;
//     let lastArgs;
//     return function(...args) {
//         if(!waiting) {
//             waiting = true;
//             func.apply(this, args);
//             setTimeout(() => {
//                 waiting = false;
//                 if(lastArgs) func.apply(this, lastArgs)
//             }, wait)
//         } else {
//             lastArgs = args;
//         }
//     }
// }

const throttle = (fn, t) => {
  let waiting = false,
    lastArgs = null;
  return function (...args) {
    if (!waiting) {
      waiting = true;
      fn.apply(this, args);
      setTimeout(() => {
        waiting = false;
        if(lastArgs) fn.apply(this, lastArgs);
      }, t);
    } else {
      lastArgs = args;
    }
  };
};
