Map
Map 类型是键值对的有序列表，而键和值都可以是任意类型

Map 本身是一个构造函数，用来生成 Map 数据结构

const m = new Map() #增删改查
Map 结构的实例针对增删改查有以下属性和操作方法：

size 属性
set()
get()
has()
delete()
clear()
#size
size 属性返回 Map 结构的成员总数。

const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
#set()
设置键名 key 对应的键值为 value，然后返回整个 Map 结构

如果 key 已经有值，则键值会被更新，否则就新生成该键

同时返回的是当前 Map 对象，可采用链式写法

const m = new Map();

m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是 undefined
m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
#get()
get 方法读取 key 对应的键值，如果找不到 key，返回 undefined

const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello) // Hello ES6!
#has()
has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true
#delete()
delete 方法删除某个键，返回 true。如果删除失败，返回 false

const m = new Map();
m.set(undefined, 'nah');
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
#clear()
clear 方法清除所有成员，没有返回值

let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0 #遍历
Map 结构原生提供三个遍历器生成函数和一个遍历方法：

keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回所有成员的遍历器
forEach()：遍历 Map 的所有成员
遍历顺序就是插入顺序

const map = new Map([
['F', 'no'],
['T', 'yes'],
]);

for (let key of map.keys()) {
console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用 map.entries()
for (let [key, value] of map) {
console.log(key, value);
}
// "F" "no"
// "T" "yes"

map.forEach(function(value, key, map) {
console.log("Key: %s, Value: %s", key, value);
});

# 垃圾回收机制

我们知道，程序运行中会有一些垃圾数据不再使用，需要及时释放出去，如果我们没有及时释放，这就是内存泄露
JS 引擎中有一个后台进程称为垃圾回收器，它监视所有对象，观察对象是否可被访问，然后按照固定的时间间隔周期性的删除掉那些不可访问的对象即可
现在各大浏览器通常用采用的垃圾回收有两种方法：

1. 引用计数
2. 标记清除

### 引用计数

最早最简单的垃圾回收机制，就是给一个占用物理空间的对象附加一个引用计数器，当有其它对象引用这个对象时，这个对象的引用计数加一，反之解除时就减一，当该对象引用计数为 0 时就会被回收。

该方式很简单，但会引起内存泄漏：

#### 循环引用的问题

```
function temp(){
    var a={};
    var b={};
    a.o = b;
    b.o = a;
}
```

这种情况下每次调用 temp 函数，a 和 b 的引用计数都是 2 ，会使这部分内存永远不会被释放，即内存泄漏。现在已经很少使用了，只有低版本的 IE 使用这种方式。

### 标记清除

V8 中主垃圾回收器就采用标记清除法进行垃圾回收。主要流程如下：

标记：遍历调用栈，看老生代区域堆中的对象是否被引用，被引用的对象标记为活动对象，没有被引用的对象（待清理）标记为垃圾数据。
垃圾清理：将所有垃圾数据清理掉

在我们的开发过程中，如果我们想要让垃圾回收器回收某一对象，就将对象的引用直接设置为 null

```
var a = {}; // {} 可访问，a 是其引用
a = null; // 引用设置为 null
// {} 将会被从内存里清理出去
```

但如果一个对象被多次引用时，例如作为另一对象的键、值或子元素时，将该对象引用设置为 null 时，该对象是不会被回收的，依然存在

```
var a = {};
var arr = [a];

a = null;
console.log(arr)
// [{}]
```

### 如果作为 Map 的键？

```
var a = {};
var map = new Map();
map.set(a, '三分钟学前端')

a = null;
console.log(map.keys()) // MapIterator {{}}
console.log(map.values()) // MapIterator {"三分钟学前端"}
```

如果想让 a 置为 null 时，该对象被回收，该怎么做？

# WeakMap vs Map

ES6 考虑到了这一点，推出了： WeakMap 。它对于值的引用都是不计入垃圾回收机制的，所以名字里面才会有一个"Weak"，表示这是弱引用（对对象的弱引用是指当该对象应该被 GC 回收时不会阻止 GC 的回收行为）。

Map 相对于 WeakMap ：

Map 的键可以是任意类型，WeakMap 只接受对象作为键（null 除外），不接受其他类型的值作为键
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； WeakMap 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
Map 可以被遍历， WeakMap 不能被遍历
下面以 WeakMap 为例，看看它是怎么上面问题的：

```
var a = {};
var map = new WeakMap();
map.set(a, '三分钟学前端')
map.get(a)

a = null;
```

上例并不能看出什么？我们通过 process.memoryUsage 测试一下：

```
//map.js
global.gc(); // 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确

function usedSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

console.log(usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 1.64M

var map = new Map();
var b = new Array(5 * 1024 * 1024);

map.set(b, 1);

global.gc();
console.log(usedSize()); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为41.82M左右

b = null;
global.gc();

console.log(usedSize()); // 3 将b置为空以后，heapUsed 仍为41.82M，说明Map中的那个长度为5*1024*1024的数组依然存在
```

执行 node --expose-gc map.js 命令：

其中，--expose-gc 参数表示允许手动执行垃圾回收机制

```
// weakmap.js
function usedSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

global.gc(); // 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确
console.log(usedSize()); // 1 初始状态，执行gc()和 memoryUsage()以后，heapUsed 值为 1.64M
var map = new WeakMap();
var b = new Array(5 * 1024 * 1024);

map.set(b, 1);

global.gc();
console.log(usedSize()); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为41.82M左右

b = null;
global.gc();

console.log(usedSize()); // 3 将b置为空以后，heapUsed 变成了1.82M左右，说明WeakMap中的那个长度为5*1024*1024的数组被销毁了
```

执行 node --expose-gc weakmap.js 命令：

上面代码中，只要外部的引用消失，WeakMap 内部的引用，就会自动被垃圾回收清除。由此可见，有了它的帮助，解决内存泄漏就会简单很多。

最后看一下 WeakMap

# WeakMap

WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的 key 则变成无效的），所以，WeakMap 的 key 是不可枚举的。

属性：

```
constructor：构造函数
方法：

has(key)：判断是否有 key 关联对象
get(key)：返回key关联对象（没有则则返回 undefined）
set(key)：设置一组key关联对象
delete(key)：移除 key 的关联对象
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);

```

除了 WeakMap 还有 WeakSet 都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏
