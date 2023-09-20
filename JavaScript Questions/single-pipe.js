function singlePipe(promiseFunc) {
  let isExecuting = false;
  let queue = [];

  async function execute(value) {
    console.log("isExecuting", isExecuting);
    if (isExecuting) {
      return new Promise((resolve) => {
        queue.push(() => resolve(promiseFunc(value)));
      });
    }

    isExecuting = true;
    const result = await promiseFunc(value);
    isExecuting = false;
    console.log(queue);
    if (queue.length > 0) {
      const nextTask = queue.shift();
      nextTask();
    }

    return result;
  }

  return execute;
}

function promiseFunc(value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, 1000);
  });
}

const request = singlePipe(promiseFunc);

request(1).then((value) => console.log(value));
request(2).then((value) => console.log(value)); // 不响应

setTimeout(function () {
  request(3).then((value) => console.log(value));
}, 1000);
