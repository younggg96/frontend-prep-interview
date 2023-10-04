/**
 * concurrency
 * @param {string[]} urls
 * @param {number} maxNum
 */

function concurrencyRequest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (urls.length === 0) {
      resolve(results);
      return;
    }
    let index = 0;
    let count = 0;

    async function request() {
      if (index === urls.length) return;
      const i = index;
      const url = urls[index++];
      try {
        const res = await fetch(url);
        results[i] = res;
      } catch (err) {
        results[i] = err;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }
    for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
      request();
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

concurrencyRequest(urls, 3).then((res) => {
  console.log(res);
});
