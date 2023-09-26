/**
 * @description 异步任务并发量的控制
 * @param {Array} list 迭代数组
 * @param {Number} limit 控制的并发数量
 * @param {Function} handler 对list每一项的处理函数
 */

// while(limit--) {
//     handler(list.shift())
// }

const runInSequence = async (list, handler, callback) => {
  const item = list.shift();
  if (item) {
    const result = await handler(item);
    callback(result);
    list.length && runInSequence(list, handler, callback);
  }
};

const asyncThrottling = ( list, limit = 3, handler = () => {} ) => {
  const response = [];
  const len = list.length;
  return new Promise((resolve) => {
    limit = len > limit ? limit : len;
    while (limit--) {
      runInSequence(list, handler, (result) => {
        response.push(result);
        response.length === len && resolve(response);
      });
    }
  });
};

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
asyncThrottling(urls, 3, (res) => {
  console.log(res);
});
