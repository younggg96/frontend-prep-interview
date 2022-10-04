# 什么是宏任务与微任务？
我们都知道 Js 是单线程都，但是一些高耗时操作就带来了进程阻塞问题。
为了解决这个问题，Js 有两种任务的执行模式：
同步模式（Synchronous）和异步模式（Asynchronous）。

### 在异步模式下，创建异步任务主要分为**宏任务**与**微任务**两种。
ES6 规范中，宏任务（Macrotask） 称为 Task， 微任务（Microtask） 称为 Jobs。宏任务是由宿主（浏览器、Node）发起的，而微任务由 JS 自身发起。
宏任务与微任务的几种创建方式 👇

## 宏任务（Macrotask）
1. setTimeout
2. setInterval
3. MessageChannel
4. I/O，事件队列
5. setImmediate（Node环境）
6. script（整体代码块）

## 微任务（Microtask）
1. requestAnimationFrame（有争议）
2. MutationObserver（浏览器环境）
3. Promise.[ then/catch/finally ]
4. process.nextTick（Node环境）
5. queueMicrotask

### 如何理解 script（整体代码块）是个宏任务呢 🤔
实际上如果同时存在两个 script 代码块，会首先在执行第一个 script 代码块中的同步代码，如果这个过程中创建了微任务并进入了微任务队列，第一个 script 同步代码执行完之后，会首先去清空微任务队列，再去开启第二个 script 代码块的执行。所以这里应该就可以理解 script（整体代码块）为什么会是宏任务。

## 什么是 EventLoop？
在主线程运行时，会产生堆(heap)和栈(stack)。

堆中存的是我们声明的object类型的数据，栈中存的是基本数据类型以及函数执行时的运行空间。

栈中的代码会调用各种外部API，它们在任务队列中加入各种事件(onClick,onLoad,onDone)，只要栈中的代码执行完毕(js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空)，主线程就回去读取任务队列，在按顺序执行这些事件对应的回调函数。

也就是说主线程从任务队列中读取事件，这个过程是循环不断的，所以这种运行机制又成为Event Loop(事件循环)。

### 执行一个宏任务，过程中遇到微任务时，将其放到微任务的事件队列里，当前宏任务执行完成后，会查看微任务的事件队列，依次执行里面的微任务。如果还有宏任务的话，再重新开启宏任务……


# 宏任务/微任务

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

macro-task(宏任务)：当前调用栈中执行的任务称为宏任务。包括：script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering。
.micro-task(微任务)： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。包括：Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver
不同类型的任务会进入对应的Event Queue，宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

# 一句话解析下什么是event loop

主线程运行的时候会生成堆（heap）和栈（stack）；
js 从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；
当程序调用外部的 API 时（比如 ajax、setTimeout 等），会将此类异步任务挂起，继续执行执行栈中的任务。等异步任务返回结果后，再按照顺序排列到事件队列中；
主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务排列到事件队列中。
主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个循环往复的过程被称为“Event Loop 事件循环”