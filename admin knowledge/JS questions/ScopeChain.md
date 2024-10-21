一、作用域
作用域，即变量（变量作用域又称上下文）和函数生效（能被访问）的区域或集合

换句话说，作用域决定了代码区块中变量和其他资源的可见性

举个例子

function myFunction() {
    let inVariable = "函数内部变量";
}
myFunction();//要先执行这个函数，否则根本不知道里面是啥
console.log(inVariable); // Uncaught ReferenceError: inVariable is not defined
上述例子中，函数myFunction内部创建一个inVariable变量，当我们在全局访问这个变量的时候，系统会报错

这就说明我们在全局是无法获取到（闭包除外）函数内部的变量

我们一般将作用域分成：

全局作用域

函数作用域

块级作用域

#全局作用域
任何不在函数中或是大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问

```
// 全局变量
var greeting = 'Hello World!';
function greet() {
  console.log(greeting);
}
// 打印 'Hello World!'
greet();
```

#函数作用域
函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问

```
function greet() {
  var greeting = 'Hello World!';
  console.log(greeting);
}
// 打印 'Hello World!'
greet();
// 报错： Uncaught ReferenceError: greeting is not defined
console.log(greeting);
可见上述代码中在函数内部声明的变量或函数，在函数外部是无法访问的，这说明在函数内部定义的变量或者方法只是函数作用域
```

#块级作用域
ES6引入了let和const关键字,和var关键字不同，在大括号中使用let和const声明的变量存在于块级作用域中。在大括号之外不能访问这些变量

```
{
  // 块级作用域中的变量
  let greeting = 'Hello World!';
  var lang = 'English';
  console.log(greeting); // Prints 'Hello World!'
}
// 变量 'English'
console.log(lang);
// 报错：Uncaught ReferenceError: greeting is not defined
console.log(greeting);
```

作用域链（Scope Chain）是 JavaScript 中一个非常重要的概念，它决定了在不同的作用域内如何查找变量。作用域链是由多个作用域（scope）按层级关系形成的链表，主要用于解决 JavaScript 中变量的访问问题。

### 作用域链的原理

在 JavaScript 中，每当一个函数被创建时，都会创建一个对应的执行上下文（Execution Context），并且这个执行上下文会包含一个指向其外部作用域的引用。这个引用形成了一个“链条”，这个链条的末端指向全局作用域（Global Scope）。

#### 作用域链的查找过程

1. **函数调用时**：每当一个函数被调用时，JavaScript 引擎会为这个函数创建一个执行上下文。在这个执行上下文中，会包含一个指向外部作用域的引用，这个引用形成了当前函数的作用域链。

2. **变量查找**：当在一个作用域中查找变量时，JavaScript 引擎会按照作用域链从当前作用域开始依次向上查找，直到找到目标变量或到达全局作用域。如果在全局作用域中也未找到该变量，就会抛出 `ReferenceError` 错误。

### 作用域链的结构

作用域链的结构可以类比为嵌套的多个作用域，每个作用域都有其内部的变量、函数等。函数内部的每个作用域都包含对外部作用域的引用，使得内部可以访问外部的变量和函数。

```javascript
// 示例代码
let a = 10;

function outer() {
  let b = 20;

  function inner() {
    let c = 30;
    console.log(a); // 输出 10，访问全局作用域的 a
    console.log(b); // 输出 20，访问外部函数 outer 的作用域
    console.log(c); // 输出 30，访问当前作用域的 c
  }

  inner();
}

outer();
```

在这个例子中，`inner` 函数的作用域链包含了三个作用域：

1. `inner` 函数作用域
2. `outer` 函数作用域
3. 全局作用域

JavaScript 引擎在执行 `inner` 函数时，会先在当前作用域中查找变量 `c`，如果找不到会向上查找 `outer` 函数的作用域中的变量 `b`，再向上查找全局作用域中的变量 `a`。

### 作用域链的特点

1. **静态性**：作用域链是基于函数的定义位置而决定的，而不是基于函数的调用位置。也就是说，函数在定义时就已经确定了它的作用域链，而不是在执行时才决定。

2. **闭包（Closure）**：闭包是作用域链的一个重要应用。当一个函数在它的外部作用域引用了某个变量时，这个函数就形成了一个闭包。闭包使得外部函数的变量在函数返回后依然能被访问。

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter(); // 输出 1
counter(); // 输出 2
```

在上面的例子中，`createCounter` 返回的匿名函数形成了一个闭包。即使 `createCounter` 执行结束后，`count` 变量依然存在于作用域链中。
