for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

// 有哪些原因会导致 setTimeout 不准时呢？
// 前面已经介绍了 setTimeout 的基本使用和浏览器是怎么实现 setTimeout 的，那么接下来就来看看有哪些原因会导致 setTimeout 不准时，等别人问到的时候也能说出个一二来了。
// 一、当前任务执行时间过久
// 通过 setTimeout 设置的回调任务被放入了延迟队列中并且等待下一次执行，这里 并不是立即执行 的；要执行消息队列中的下个任务，需要等待当前的任务执行完成，如果 当前任务执行时间过久是会导致定时器设置的任务被延迟执行的。
// 简单来说就是 JS 引擎会先执行同步的代码之后才会执行异步的代码，如果同步的代码执行时间过久，是会导致异步代码延迟执行的。
// 文章开篇的例子就是一个因为前面的任务执行时间过久而导致的 setTimeout 不能够准时执行。
// js复制代码let startTime = +new Date();
setTimeout(() => {
  let endTime = +new Date();
  console.log(endTime - startTime);
}, 20);
for (let i = 0; i < 90000000; i++) {}

// 再来看一下下面这个例子：
js复制代码setTimeout(() => {
  console.log(1);
}, 20);
for (let i = 0; i < 90000000; i++) {}
setTimeout(() => {
  console.log(2);
}, 0);

// 如果没有中间那一段 for 循环的代码，按照两个 setTimeout 设定的时间，打印的顺序应该是 2、1 的。
// 那中间加上这样一段 for 循环的代码之后呢？

// 它的打印顺序是 1、2。
// 之所以举这个例子，是因为我想说明 setTimeout 设置的回调任务是 按照顺序添加到延迟队列里面的，当执行完一个任务之后，ProcessDelayTask 函数会根据发起时间和延迟时间来计算出到期的任务，然后 依次执行 这些到期的任务。
// 在执行完前面的任务之后，上面例子的两个 setTimeout 都到期了，那么按照顺序执行就是打印 1 和 2。所以在这个场景下，setTimeout 就显得不那么可靠了

// 二、嵌套调用 setTimeout 存在最小时延 4ms
// 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4ms。
// setTimeout 的第二个参数设置为 0 （未设置、小于 0、大于 2147483647 时都默认为 0）的时候，意味着马上执行，或者尽快执行。
// 但是在 Chrome 中它有这样的一个设置：

// If timeout is less than 0, then set timeout to 0. If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.

// 上面这句话的意思是，如果延迟时间小于 0，则会把延迟时间设置为 0。如果定时器嵌套 5 次以上并且延迟时间小于 4ms，则会把延迟时间设置为 4ms。
// 即在定时器函数里面嵌套调用定时器，系统会判断该函数方法被阻塞了，如果延迟时间是小于 4ms 的，会延长定时器的执行时间至 4ms。
// 像下面这段代码，一直被嵌套调用，则后面的定时器都会有最小时延 4ms
function cb() {
  setTimeout(cb, 0);
}
setTimeout(cb, 0);

// 三、未激活的页面，setTimeout 的最小执行间隔是 1000ms
// 除了 4ms 延迟，还有一个很容易被忽略的地方，那就是未被激活的页面中定时器最小值大于 1000ms，也就是说，如果标签不是当前的激活标签，那么定时器最小的时间间隔是 1000ms，目的是为了 优化后台页面的加载损耗以及降低耗电量。
// 未被激活的页面是什么概念呢？
// 就是切换了标签页或者把浏览器最小化，有如下代码：
// 这是一个计时器，每 50ms 计时一次，倒计时从 100 到 0。
// js复制代码let num = 100;
function setTime() {
  // 当前秒执行的计时
  console.log(new Date().getSeconds() + "：" + num);
  num ? num-- && setTimeout(() => setTime(), 50) : "";
}
setTime();

// 四、延时执行时间有最大值
// Chrome、Safari、Firefox 等浏览器都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒（大约 24.8 天），如果设置的延迟值大于这个数时会溢出，那么相当于延时值被设置为 0 了，这导致定时器会被立即执行。


// 有什么可以替代 setTimeout 的吗？
// 既然 setTimeout 在时效性上面有很多先天的不足，那么对于一些时间精度要求比较高的需求，应该有针对性地采取一些其他的方案。
// 比如要使用 JS 来实现动画效果，函数 requestAnimationFrame 就是一个很好的选择。
// 使用 requestAnimationFrame 实现的动画效果比 setTimeout 好的原因如下：

// 使用 requestAnimationFrame 不需要设置具体的时间；

// 它提供一个原生的API去执行动画的效果，它会在一帧（一般是 16ms）间隔内根据选择浏览器情况去执行相关动作。
// setTimeout 是在特定的时间间隔去执行任务，不到时间间隔不会去执行，这样浏览器就没有办法去自动优化


// requestAnimationFrame 里面的回调函数是在页面刷新之前执行，它跟着屏幕的刷新频率走，保证每个刷新间隔只执行一次；
// 如果页面未激活的话，requestAnimationFrame 也会停止渲染，这样既可以保证页面的流畅性，又能节省主线程执行函数的开销。