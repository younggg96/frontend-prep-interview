// 请实现一个支持placeholder的curry()，可以像这样使用。

// const  join = (a, b, c) => {
//    return `${a}_${b}_${c}`
// }

// const curriedJoin = curry(join)
// const _ = curry.placeholder

// curriedJoin(1, 2, 3) // '1_2_3'

// curriedJoin(_, 2)(1, 3) // '1_2_3'

// curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
  }