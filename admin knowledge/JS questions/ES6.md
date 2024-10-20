扩展运算符（Spread Operator），使用 `...` 表示，是 ES6 引入的一个语法特性。它的主要功能是将数组、对象等可迭代的元素展开，常见的用法如下：

### 1. **数组中的应用**

- **数组的复制**：使用扩展运算符可以快速地创建一个数组的浅拷贝。例如：
  ```javascript
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1]; // [1, 2, 3]
  ```
- **数组的合并**：可以使用扩展运算符将多个数组合并为一个新数组。例如：

  ```javascript
  const arr1 = [1, 2];
  const arr2 = [3, 4];
  const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]
  ```

- **函数参数传递**：扩展运算符可以将数组的每个元素展开传递给函数，类似 `apply` 的效果。例如：
  ```javascript
  const arr = [1, 2, 3];
  console.log(Math.max(...arr)); // 3
  ```

### 2. **解构赋值中的应用**

- **数组解构赋值**：使用扩展运算符可以将一个数组中的剩余元素收集到一个新数组中。

  ```javascript
  const [first, ...rest] = [1, 2, 3, 4];
  console.log(first); // 1
  console.log(rest); // [2, 3, 4]
  ```

- **对象解构赋值**：在 ES2018（ES9）中，扩展运算符还被扩展到对象的解构赋值中，可以用于提取对象的部分属性并将剩余属性收集到一个新对象中。
  ```javascript
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;
  console.log(a); // 1
  console.log(rest); // { b: 2, c: 3 }
  ```

### 3. **对象中的应用**

- **对象的浅拷贝**：可以通过扩展运算符快速创建对象的浅拷贝。

  ```javascript
  const obj1 = { a: 1, b: 2 };
  const obj2 = { ...obj1 }; // { a: 1, b: 2 }
  ```

- **对象的合并**：扩展运算符还可以用于将多个对象合并到一个新对象中。后面的对象属性会覆盖前面的同名属性。
  ```javascript
  const obj1 = { a: 1, b: 2 };
  const obj2 = { b: 3, c: 4 };
  const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }
  ```

### 4. **函数参数的收集（剩余参数）**

- 在函数定义中，可以使用扩展运算符作为剩余参数来收集不定数量的参数到一个数组中。
  ```javascript
  function sum(...args) {
    return args.reduce((acc, cur) => acc + cur, 0);
  }
  console.log(sum(1, 2, 3, 4)); // 10
  ```

在 ES6（ECMAScript 2015）中，数组构造函数新增了两个重要的方法：`Array.from()` 和 `Array.of()`。这两个方法在创建和转换数组时提供了简洁、直观的解决方案。以下是这两个方法的详细说明：

### 1. **`Array.from()` 方法**

`Array.from()` 方法用于将类数组对象或可迭代对象（如 `Set`、`Map`、`arguments` 对象、NodeList 等）转换为数组。

#### 主要特性：

- **转换类数组对象**：可以将任何拥有 `length` 属性的对象（类数组对象）转换为真正的数组。
- **转换可迭代对象**：可以将具有迭代能力的对象（如 `Set`、`Map`、字符串等）转换为数组。
- **支持第二个参数**：该方法可以接受一个回调函数，用于对每个元素进行处理，类似于 `map()` 方法的功能。

#### 示例代码：

```javascript
// 转换类数组对象（如 arguments）
function foo() {
  const argsArray = Array.from(arguments);
  console.log(argsArray); // [1, 2, 3]
}
foo(1, 2, 3);

// 转换字符串为数组
const str = "hello";
const strArray = Array.from(str);
console.log(strArray); // ['h', 'e', 'l', 'l', 'o']

// 转换并使用回调函数
const doubled = Array.from([1, 2, 3], (x) => x * 2);
console.log(doubled); // [2, 4, 6]
```

### 2. **`Array.of()` 方法**

`Array.of()` 方法用于根据一组参数创建一个新的数组，解决了在使用 `Array()` 构造函数时的某些问题。例如，当使用 `Array(3)` 时，创建的是一个包含 3 个空位的数组，而不是 `[3]`。而 `Array.of(3)` 则会创建一个包含元素 `3` 的数组。

#### 主要特性：

- **根据参数创建数组**：可以直接根据给定的参数列表创建一个新的数组，而不考虑参数的类型和数量。
- **避免使用 `Array()` 的困惑**：与 `Array()` 构造函数不同，`Array.of()` 不会因为参数的数量或类型而产生意外的行为。

具体来说：

- `Array(3)`：会创建一个长度为 3 的空数组（即 `[ , , ]`，包含 3 个空槽）。
- `Array(1, 2, 3)`：会创建一个包含三个元素的数组 `[1, 2, 3]`。

为了解决这种困惑，ES6 提供了 `Array.of()`，它的行为更加直观，无论传递什么参数，都会创建一个包含这些参数的新数组。例如：

- `Array.of(3)`：创建一个包含单个元素 3 的数组 `[3]`。
- `Array.of(1, 2, 3)`：创建一个包含三个元素的数组 `[1, 2, 3]`。

所以，`Array.of()` 的设计目的是为了避免使用 `Array()` 时的这种歧义行为，使得代码更加清晰和易读。

#### 示例代码：

```javascript
// 使用 Array.of() 创建数组
const arr1 = Array.of(3); // [3]
const arr2 = Array.of(1, 2, 3); // [1, 2, 3]

// 使用 Array() 的差异
const arr3 = Array(3); // [ , , ] - 一个长度为 3 的空数组
const arr4 = Array(1, 2, 3); // [1, 2, 3]
```

在 ES6（ECMAScript 2015）中，对象新增了一些重要的特性和方法，使得操作和处理对象变得更加简洁和强大。以下是 ES6 为对象新增的扩展：

### 1. **对象字面量的增强（Object Literal Enhancements）**

ES6 增强了对象字面量的表达方式，主要包括以下几个方面：

- **属性简写**：当对象的属性名称与变量名相同，可以使用简写语法。

  ```javascript
  const name = "Alice";
  const age = 25;
  const person = { name, age }; // 等价于 { name: name, age: age }
  ```

- **方法简写**：定义对象方法时，可以省略 `function` 关键字。

  ```javascript
  const person = {
    sayHello() {
      console.log("Hello");
    },
  };
  ```

- **计算属性名**：允许使用表达式作为对象的属性名。
  ```javascript
  const propName = "score";
  const student = {
    [propName]: 90, // 动态计算属性名
  };
  console.log(student.score); // 90
  ```

### 2. **`Object.assign()` 方法**

`Object.assign()` 方法用于将一个或多个源对象的属性复制到目标对象中。该方法可以实现浅拷贝。

```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
```

### 3. **`Object.is()` 方法**

`Object.is()` 方法用于比较两个值是否完全相同，类似于 `===`，但在处理 `NaN` 和 `+0`、`-0` 时有所不同。

```javascript
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
```

### 4. **`Object.entries()`、`Object.keys()` 和 `Object.values()` 方法**

- **`Object.keys()`**：返回对象自身可枚举属性的键名数组。
- **`Object.values()`**：返回对象自身可枚举属性的值数组。
- **`Object.entries()`**：返回对象自身可枚举属性的键值对数组。

示例：

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // ['a', 'b', 'c']
console.log(Object.values(obj)); // [1, 2, 3]
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]
```

### 5. **`Object.getOwnPropertyDescriptors()` 方法**

`Object.getOwnPropertyDescriptors()` 返回对象所有自身属性的描述符，是 `Object.getOwnPropertyDescriptor()` 的扩展版，可以一次性获取所有属性的描述符。

```javascript
const obj = { a: 1 };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// {
//   a: {
//     value: 1,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
```

### 6. **`__proto__` 属性和 `Object.setPrototypeOf()`、`Object.getPrototypeOf()` 方法**

- **`__proto__` 属性**：ES6 标准化了 `__proto__` 属性，允许直接访问和修改对象的原型。
- **`Object.setPrototypeOf()`**：用于显式设置对象的原型。
- **`Object.getPrototypeOf()`**：用于获取对象的原型。

示例：

```javascript
const proto = {
  greet() {
    console.log("Hello!");
  },
};
const obj = Object.create(proto);
console.log(Object.getPrototypeOf(obj) === proto); // true
```

### 7. **`Object.freeze()` 和 `Object.seal()`**

虽然这两个方法在 ES5 中已经存在，但 ES6 中新增的方法和属性更好地配合了这些功能：

- **`Object.freeze()`**：冻结对象，使其属性不可修改、添加或删除。
- **`Object.seal()`**：封闭对象，使其属性不可删除，但属性值仍然可以修改。
