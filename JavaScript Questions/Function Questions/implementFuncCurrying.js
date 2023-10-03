// 柯里化(Currying) 在JavaScript是一个常用的技巧。

// 请实现一个curry()方法，接受一个function然后返回一个柯里化过后的function。

// 这是一个例子

// const join = (a, b, c) => {
//    return `${a}_${b}_${c}`
// }

// const curriedJoin = curry(join)

// curriedJoin(1, 2, 3) // '1_2_3'

// curriedJoin(1)(2, 3) // '1_2_3'

// curriedJoin(1, 2)(3) // '1_2_3'

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  return function curryInner(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...args2) => curryInner(...args, ...args2);
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
// console.log(curriedJoin(1, 2)(3));

// curriedJoin(1, 2, 3); // '1_2_3'

// curriedJoin(1)(2, 3); // '1_2_3'

// curriedJoin(1, 2)(3); // '1_2_3'

// 所谓函数柯里化，其实就是把一个接受多个参数的函数，转变成接受一个单一参数，且返回接受剩余参数并能返回结果的新函数的技术。举个最简单的例子：

// const add = (a, b) => a + b;
// add(1, 2);
// add是一个求和的函数，它接受2个参数，但假设我们将其变为柯里化函数，它应该接受一个参数，并返回一个接受剩余参数，且依旧能求出相同结果的函数：

// const add = () => {//...};
// // 接受第一个参数且返回了一个新函数
// const add_ = add(1);
// // 新函数接受剩余参数，最终得出最终结果
// add_(2);
// // 简约来写就是
// add(1)(2);
// 说到底，函数柯里化的概念其实也离不开闭包，函数A接受一个参数（闭包中的自由变量）且返回一个新函数B（闭包），
// 而函数A明明已执行并释放，当函数B执行时依旧能访问A函数当时所接参数。

const addCurry = (a) => (b) => a + b;

const addCurry2 = (a) => {
  return (b) => {
    return a + b;
  };
};

// addCurry2(1)(2);
// console.log(addCurry2(1)(2));

const addCurry3 = function (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};

// addCurry(1, 2, 3);
// addCurry(1, 2)(3);
// addCurry(1)(2, 3);
// addCurry(1)(2)(3);

// 要求实现一个可以无限调用的函数，且每次调用都能得到最终结果，比如：

// addCurry(1);
// addCurry(1)(2);
// addCurry(1)(2)(3, 4);
// addCurry(1)(2)(3, 4)(5)(6, 7);

const join2 = (...a) => {
  const str = a.reduce((pre, cur) => pre + `_${cur}`);
  const func = (...b) => join2(str, ...b);
  func.toString = () => {
    return str;
  }
  return func;
};

// console.log(join2(1, 2, 3, 4, 5, 6));

// const curriedJoin2 = curry(join2);
console.log(""+join2(1)(2)(3)(4));
