// Promise.all()
// Promise.all() 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。
// 当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），
// 并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    let pending = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((res) => {
        pending--;
        results[index] = res;
        if (pending === 0) {
          resolve(results);
        }
      }, reject);
    });
  });
};

promiseAll([promise1, promise2, promise3]).then((values) => {
    console.log(values);
  });