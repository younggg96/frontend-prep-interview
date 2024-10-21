**JavaScript 原型** 和 **原型链** 是 JavaScript 中的两个重要概念。理解这两个概念有助于我们掌握 JavaScript 的继承机制和对象的属性查找机制。

### 1. **原型 (Prototype)**
每一个 JavaScript 对象都有一个内部链接，指向另一个对象（即 **原型对象**）。我们可以使用 `__proto__` 或 `Object.getPrototypeOf()` 来访问该对象的原型。在 JavaScript 中，每个函数都有一个 `prototype` 属性，该属性指向一个对象（称为 **原型对象**）。当函数作为构造函数被调用时，所有通过此构造函数创建的对象实例将继承该原型对象的属性和方法。

#### 特点：
- JavaScript 通过 **原型** 来实现属性的继承。
- 每个 JavaScript 对象都有一个内部属性 `[[Prototype]]`，可以通过 `__proto__` 访问。
- 函数都有一个属性叫 `prototype`，当函数作为构造函数被调用时，新创建的对象的 `__proto__` 会指向这个 `prototype`。

**示例：**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person('Alice');
person1.sayHello(); // Hello, my name is Alice
```

在上面的代码中，`Person.prototype` 定义了一个 `sayHello` 方法，这个方法可以被所有通过 `Person` 构造函数创建的对象实例共享。

### 2. **原型链 (Prototype Chain)**
当我们访问对象的一个属性或方法时，JavaScript 会先在对象本身上查找该属性，如果找不到，则会沿着该对象的 **原型链** 继续查找。原型链的本质是一个对象的链条，每个对象都通过其 `__proto__` 指向其原型对象（构造函数的 `prototype`）。原型链的顶端是 `Object.prototype`，它的 `__proto__` 是 `null`，这意味着原型链的查找会在 `Object.prototype` 处终止。

#### 特点：
- 原型链的主要目的是实现对象的继承。
- 每个对象都有一个 `__proto__` 属性，指向其原型对象。
- 当访问对象的某个属性或方法时，如果对象本身没有，则会沿着原型链向上查找，直到 `Object.prototype`。

**示例：**
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.getName = function() {
  return this.name;
};

function Dog(name, breed) {
  Animal.call(this, name); // 继承属性
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype); // 继承方法
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log('Woof! Woof!');
};

const dog1 = new Dog('Buddy', 'Golden Retriever');

console.log(dog1.getName()); // Buddy (从 Animal 的原型链上查找到的方法)
dog1.bark(); // Woof! Woof! (从 Dog 的原型上查找到的方法)
```

在这个例子中，`Dog` 继承了 `Animal` 的属性和方法。`Dog` 的原型链如下：
- `dog1` -> `Dog.prototype` -> `Animal.prototype` -> `Object.prototype` -> `null`

### **总结：**
- **原型**：每个对象都有一个指向原型对象的内部属性，用于实现继承。
- **原型链**：由多个原型对象连接而成的链，用于属性和方法的查找。

通过理解这两个概念，可以更好地掌握 JavaScript 的继承机制和对象属性的查找逻辑。