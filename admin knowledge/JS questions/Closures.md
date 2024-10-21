## Closure

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途；
闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

```
比如，函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。

经典面试题：循环中使用闭包解决 var 定义函数的问题
```
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

for (var i = 1; i <= 5; i++) {
    (function(j) {
        setTimeout(function timer() {
            console.log(j)
        }, j * 1000)
    })(i)
}
```

# 一、是什么
一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）

也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域

在 JavaScript中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁

下面给出一个简单的例子
```
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
displayName() 没有自己的局部变量。然而，由于闭包的特性，它可以访问到外部函数的变量
```
# 二、使用场景
任何闭包的使用场景都离不开这两点：

创建私有变量
延长变量的生命周期

一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

```
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    }
    value: function() {
      return privateCounter;
    }
  }
})()

```
上述通过使用闭包来定义公共函数，并令其可以访问私有函数和变量，这种方式也叫模块方式


### 示例场景：按钮点击计数器

我们希望创建一个按钮，点击按钮后，页面上显示按钮被点击的次数。这里，我们将通过闭包来捕获一个变量来实现这个功能。

```html
<button id="clickMe">点击我</button>
<p id="displayCount">你还没有点击按钮</p>
```

### JavaScript 代码

```javascript
function createClickCounter() {
  let count = 0; // 外部变量，存储点击次数

  // 返回一个事件处理函数，它可以访问外部的 count 变量
  return function() {
    count += 1; // 每次点击时增加 count 变量的值
    document.getElementById('displayCount').textContent = `按钮被点击了 ${count} 次`;
  };
}

// 获取按钮元素
const button = document.getElementById('clickMe');

// 创建一个计数器并将它赋给 clickHandler
const clickHandler = createClickCounter();

// 为按钮绑定事件处理函数
button.addEventListener('click', clickHandler);
```

### 解释

1. `createClickCounter` 函数内部定义了一个变量 `count`，用于保存点击次数。
2. 它返回了一个匿名函数，这个函数每次被调用时都会增加 `count` 变量的值。
3. `clickHandler` 是 `createClickCounter` 返回的函数，它形成了一个闭包。闭包可以访问并修改 `count` 变量，即使 `createClickCounter` 函数已经执行完毕。
4. 通过 `addEventListener` 将 `clickHandler` 作为点击事件的处理函数。
5. 每次点击按钮时，`clickHandler` 会运行，并更新 `count` 的值，并在页面上显示当前点击次数。

### 为什么这是一个闭包？

因为 `clickHandler` 函数是在 `createClickCounter` 内部定义的，并且在 `createClickCounter` 执行结束后继续存在。由于闭包的特性，它可以记住并访问外部函数（`createClickCounter`）的变量 `count`。

在这个示例中，闭包允许 `clickHandler` 捕获并访问 `count`，使得每次点击按钮后都能正确地更新点击次数。这展示了如何在回调函数中利用闭包捕获和使用外部的变量。

如果我们不使用闭包，也可以实现按钮点击计数的功能。通常，我们会将变量声明在全局作用域中，或者使用对象来保存状态。不过，这样会暴露全局变量，可能引发命名冲突或数据被其他代码不小心修改的问题。

### 不使用闭包的方式

我们可以把计数变量直接定义在全局作用域中：

```html
<button id="clickMe">点击我</button>
<p id="displayCount">你还没有点击按钮</p>
```

### JavaScript 代码（不使用闭包）

```javascript
// 在全局作用域中定义一个计数变量
let count = 0;

// 定义一个函数，用于处理点击事件
function clickHandler() {
  count += 1; // 每次点击时增加 count 变量的值
  document.getElementById('displayCount').textContent = `按钮被点击了 ${count} 次`;
}

// 获取按钮元素
const button = document.getElementById('clickMe');

// 为按钮绑定事件处理函数
button.addEventListener('click', clickHandler);
```

### 解释

1. `count` 变量被声明在全局作用域，因此任何代码都可以访问和修改它。
2. `clickHandler` 函数增加 `count` 的值，并更新页面的文本内容。
3. 我们将 `clickHandler` 绑定到按钮的点击事件。

### 问题与局限性

1. **全局变量污染**：`count` 变量在全局作用域中定义，容易被其他函数或代码意外修改。例如，如果有其他代码也定义了同名变量或不小心修改了 `count`，就可能导致逻辑错误。
2. **命名冲突**：由于 `count` 处于全局作用域，如果在项目中有其他计数器功能或同名变量，会导致冲突，难以管理。
3. **缺少封装性**：所有代码都可以直接访问和修改 `count`，违背了封装的原则。

### 使用闭包的好处

1. 闭包可以将 `count` 变量“封装”在 `createClickCounter` 函数的作用域中，只有通过闭包中的函数（如 `clickHandler`）才能访问和修改 `count`，从而保证数据的私密性。
2. 闭包避免了全局变量的污染，减少命名冲突的可能性。
3. 代码更加模块化和可维护。

### 总结

通过不使用闭包的方式，你可以实现相同的功能，但容易出现全局变量污染和命名冲突的问题。而使用闭包的方式，可以更好地管理状态，避免变量泄漏或冲突。因此，闭包在这种场景下更优雅且更安全。