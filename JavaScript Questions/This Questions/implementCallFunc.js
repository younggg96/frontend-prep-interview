// 实现`Function.prototype.call
// `Function.prototype.call可以用来很方便的修改函数的this。

// 你能实现一个myCall来模拟Function.prototype.call吗？

// 根据最新的 ECMAScript spec，thisArg 不会被类型转换，在 Strict Mode下也不会被更改为window。

// 你的代码需要遵从上述逻辑，实现非strict mode的情况。

// 实现`Function.prototype.call
// `Function.prototype.call可以用来很方便的修改函数的this。

// 你能实现一个myCall来模拟Function.prototype.call吗？

// 根据最新的 ECMAScript spec，thisArg 不会被类型转换，在 Strict Mode下也不会被更改为window。

// 你的代码需要遵从上述逻辑，实现非strict mode的情况。

Function.prototype.mycall = function (thisArg, ...args) {
  // your code here
  const context =
    thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);
  const symbol = Symbol();
//   Object.defineProperty(thisArg, symbol, {
//       enumerable: false,
//       value: this,
//   })
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
};

function method(a, b) {
  console.log(this, a, b);
  return a + b;
}

method.mycall({}, 2, 4);
