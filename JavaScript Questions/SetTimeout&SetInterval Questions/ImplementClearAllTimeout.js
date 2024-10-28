// window.setTimeout() 可以用来设定未来将要执行的任务。

// 你能否实现一个clearAllTimeout() 来取消掉所有未执行的timer？比如当页面跳转的时候我们或许想要清除掉所有的timer。

// setTimeout(func1, 10000)
// setTimeout(func2, 10000)
// setTimeout(func3, 10000)
// // 3个方法都是设定在10秒以后
// clearAllTimeout()
// // 所有方法的timer都被取消掉了
// 注意

// 你需要保证window.setTimeout 和 window.clearTimeout 还是原来的interface，虽然你可以替换其中的逻辑。

/**
 * cancel all timer from window.setTimeout (easy verision)
 */
const originalSetTimeout = window.setTimeout;
const timer = [];

window.setTimeout = function (callback, delay) {
  const id = originalSetTimeout(callback, delay);
  timer.push(id);
  return id;
};
function clearAllTimeout() {
  // your code here
  timer.forEach((id) => {
    clearTimeout(id);
  });
}


(function() {
    // 保存原始的 setTimeout 和 clearTimeout 方法
    const originalSetTimeout = window.setTimeout;
    const originalClearTimeout = window.clearTimeout;
  
    // 用来存储所有的 timer IDs
    const timeoutIds = new Set();
  
    // 重写 setTimeout 方法
    window.setTimeout = function(callback, delay, ...args) {
      // 使用原始 setTimeout 方法设置计时器
      const timerId = originalSetTimeout(callback, delay, ...args);
      // 存储计时器 ID
      timeoutIds.add(timerId);
      // 返回计时器 ID 以保持接口一致性
      return timerId;
    };
  
    // 重写 clearTimeout 方法
    window.clearTimeout = function(timerId) {
      // 移除存储的计时器 ID
      timeoutIds.delete(timerId);
      // 使用原始 clearTimeout 方法清除计时器
      originalClearTimeout(timerId);
    };
  
    // 定义 clearAllTimeout 方法
    window.clearAllTimeout = function() {
      // 遍历所有存储的计时器 ID 并清除它们
      timeoutIds.forEach(timerId => originalClearTimeout(timerId));
      // 清空计时器 ID 集合
      timeoutIds.clear();
    };
  })();
  
