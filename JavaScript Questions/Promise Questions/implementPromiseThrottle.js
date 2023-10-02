// 假设你需要调用100个API获取数据，并且需要越快越好。

// 如果使用Promise.all()，100个请求会同时到达你的服务器，如果你的服务器性能很低的话，这就会是个负担。

// 请 节流API请求，使得任何时刻最多只有5个请求正在进行中。

// 你需要实现一个throttlePromises() 函数来达到目的。这个函数接受一个promise生成函数的数组，和一个同一时刻进行中的API请求最大数量。

// throttleAsync(callApis, 5).then((data) => {
//   // 数据和使用`Promise.all`得到的 一样
// }).catch((err) => {
//   // 发生错误的时候，也和`Promise.all`的行为一样
// })
// 执行上述代码过后，因为任何时候都不会超过5个API请求在进行，性能低下的服务器得救了。

/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  // your code here
  const results = new Array(funcs.length).fill(null);
  let len = funcs.length;
  let i = 0;

  return new Promise((resolve, reject) => {
    max = len > max ? max : len;
    const helper = async (arr) => {
      const func = arr.shift();
      if (func) {
        try {
          const res = await func();
          results[i++] = res;
          if (arr.length) {
            helper(arr);
          }
          if (results.every((res) => res !== null)) resolve(results);
        } catch (err) {
          reject(err);
        }
      }
    };
    while (max--) {
      helper(funcs);
    }
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

const helper = (url) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(url + "fail");
    }, 1000);
  });
};

const promiseFunctions = urls.map((url) => () => helper(url));

throttlePromises(promiseFunctions, 3).then((res) => {
  console.log(res);
});
