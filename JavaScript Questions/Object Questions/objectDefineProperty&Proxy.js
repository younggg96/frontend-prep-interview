Object.defineProperty;
// Object.defineProperty 是一个用于定义 或 修改 JavaScript对象属性的方法。
// 它可以修改对象的属性描述符，包括属性值、可枚举性、可配置性和可写性。
var obj = {};

Object.defineProperty(obj, "name", {
  value: "Tom",
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(obj.name); // 输出 Tom
obj.name = "Jerry"; // 不会修改属性值
console.log(obj.name); // 输出 Tom

var target = {
  name: "Tom",
  age: 20,
};

var handler = {
  get: function (target, prop, receiver) {
    console.log("get", prop);
    return target[prop];
  },
  set: function (target, prop, value, receiver) {
    console.log("set", prop, value);
    target[prop] = value;
  },
};

var proxy = new Proxy(target, handler);

console.dir(proxy.name); // 输出 'get name' 和 'Tom'
proxy.age = 21; // 输出 'set age 21'
console.log(proxy.age); // 输出 'get age' 和 21

// Object.defineProperty 主要用于修改或扩展对象的属性描述符，它不能拦截对象的其他操作。

// Proxy 可以拦截对象的各种操作，包括读取、赋值、删除、枚举等，它可以用于实现各种高级功能。

// Object.defineProperty 是 ES5 中引入的，而 Proxy 是 ES6 中新增的。

// Object.defineProperty 支持的操作比 Proxy 少，只能修改或扩展属性描述符，而 Proxy 支持的操作更加广泛。
