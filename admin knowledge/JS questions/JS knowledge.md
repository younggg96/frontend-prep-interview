`var`、`let` 和 `const` 是 JavaScript 中声明变量的三种方式，它们之间有一些关键区别：

### 1. **作用域范围**

- **`var`**: `var` 声明的变量是**函数作用域**（function scope），即它的作用范围仅限于函数内部。如果在函数外声明，则是全局作用域。它不会受到块级（如 `if`、`for` 等）影响，所以在块内使用 `var` 声明的变量，依然可以在块外访问。

  ```javascript
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
  ```

- **`let` 和 `const`**: `let` 和 `const` 都是**块级作用域**（block scope），即它们的作用范围仅限于当前代码块内（如 `if`、`for`、`while` 等），在块外无法访问。

  ```javascript
  if (true) {
    let y = 20;
    const z = 30;
  }
  console.log(y); // ReferenceError: y is not defined
  console.log(z); // ReferenceError: z is not defined
  ```

### 2. **变量提升（Hoisting）**

- **`var`**: 变量会被提升到作用域的顶部。虽然提升了声明，但初始化不会被提升。因此，即使 `var` 变量在使用前声明，它的值是 `undefined`，直到赋值操作发生。

  ```javascript
  console.log(a); // undefined
  var a = 10;
  ```

- **`let` 和 `const`**: `let` 和 `const` 也会被提升，但在它们的声明之前使用会导致**暂时性死区**（Temporal Dead Zone, TDZ），因此会报错。

  ```javascript
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 20;

  console.log(c); // ReferenceError: Cannot access 'c' before initialization
  const c = 30;
  ```

### 3. **重新赋值和重新声明**

- **`var`**: 允许重新声明和重新赋值。

  ```javascript
  var d = 40;
  var d = 50; // 重新声明
  d = 60; // 重新赋值
  ```

- **`let`**: 允许重新赋值，但不允许重新声明。

  ```javascript
  let e = 70;
  // let e = 80; // SyntaxError: Identifier 'e' has already been declared
  e = 80; // 可以重新赋值
  ```

- **`const`**: 既不允许重新声明，也不允许重新赋值。`const` 声明的变量必须在声明时进行初始化，且之后不可更改。

  ```javascript
  const f = 90;
  // const f = 100; // SyntaxError: Identifier 'f' has already been declared
  // f = 100; // TypeError: Assignment to constant variable
  ```

  但是需要注意的是，如果 `const` 声明的是一个引用类型（如对象或数组），那么它的引用地址不能被更改，但内部的属性或元素是可以修改的。

  ```javascript
  const obj = { name: "Alice" };
  obj.name = "Bob"; // 允许修改对象内部属性
  console.log(obj.name); // "Bob"
  ```

### 总结

- `var` 具有函数作用域，支持变量提升，可以重复声明。
- `let` 具有块级作用域，存在暂时性死区，不允许重复声明。
- `const` 具有块级作用域，存在暂时性死区，声明后必须初始化，且不可修改引用地址。

这三者的选择一般是优先考虑 `const`，其次是 `let`，尽量避免使用 `var`。

### JavaScript 有哪些数据类型，它们的区别？

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。
其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

这些数据可以分为原始数据类型和引用数据类型：

栈：原始数据类型（Undefined、Null、Boolean、Number、String）
堆：引用数据类型（对象、数组和函数）

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

在数据结构中，栈中数据的存取方式为先进后出。
堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。
