// 基础概念
// 闭包是：能够读取其他函数内部变量的函数。简单理解就是函数中嵌套函数
// 由于在JS中，变量的作用域属于函数作用域，在函数执行后作用域就会被清理、
// 内存也随之回收，但是由于闭包是建立在一个函数内部的子函数，由于其可访问上级作用域的原因，
// 即使上级函数执行完，作用域也不会随之销毁，这时的子函数——也就是闭包，便拥有了访问上级作用域中的变量的权限，
// 即使上级函数执行完后作用域内的值也不会被销毁。

// 延长局部变量的生命周期。
// 可以在函数外部访问函数的内部变量。

// 为什么会产生闭包？

// 一般函数执行之后内部的变量便会销毁，但是内部函数的作用域链引用了这个变量（外部函数的执行上下文Active Object）。
// 因此这个变量不会销毁。从而形成了闭包。

// 闭包的缺点：

// 内存占用越来越高。所以一些dom对象用完最好销毁掉。

// 闭包的作用：

// 模块化代码避免全局变量的污染。
// 变量私有化，并且可以外部增删查改。

/**
 * 一个简单的闭包函数
 * @returns
 */
function outer() {
  var a = 1;

  function inner() {
    console.log(a); //1
  }
  return inner;
}

outer()();

function createFunc() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = function () {
      console.log(i);
    };
  }
  return result;
}

function createFunc2() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = (function (i) {
      return function () {
        console.log(i);
      };
    })(i);
  }
  return result;
}

// var result = createFunc2();
// result[0](); //10
// result[1](); //10
// result[2](); //10
// result[3](); //10
// result[4](); //10
// result[5](); //10
// result[6](); //10
// result[7](); //10

// 定义私有属性
function Person(param) {
  var name = param.name; // 私有属性
  this.age = 18; // 共有属性

  this.sayName = function () {
    console.log(name);
  };
}

// const tom = new Person({name: 'tom'});
// tom.age += 1; // 共有属性，外部可以更改
// tom.sayName(); // tom
// tom.name = 'jerry';// 共有属性，外部不可更改
// tom.sayName(); // to

// 平方计算
// 你定义了一个立即执行函数表达式 (IIFE)，它返回了一个带有缓存功能的函数 square。
// 这个函数接受一个参数 n，并返回 n 的平方，但具有缓存功能，以避免重复计算。
const square = (function () {
  var cache = {};
  return function (n) {
    if (!cache[n]) {
      cache[n] = n * n;
    }
    return cache[n];
  };
})();

// console.log(square(5));

// 函数节流防抖
function debounce(fn, delay) {
  const timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
    }, delay);
  };
}

function throttle(func, wait) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// var scope = "global scope";
// function checkscope() {
//   var scope = "local scope";
//   console.log(scope);
// }

var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  return function f() {
    console.log(scope);
  };
}
// var fn = checkscope();

checkscope()()
