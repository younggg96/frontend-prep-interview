class MultiRequest {
  max = 3;
  queue = [];
  curr = 0;

  constructor(urls, max) {
    this.queue = [...urls];
    this.max = max;
  }

  ajax(url) {
    // 用AbortController控制超时
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);

    const promise = fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((res) => {
        return {
          ...res,
          url,
          success: true,
        };
      })
      .catch((err) => {
        success: false, url, err;
      })
      .finally(() => clearTimeout(id));
    return promise;
  }

  pick(remain) {
    let count = remain.length;
    const todo = remain;
    while (count < this.max && this.curr < this.queue.length) {
      const ele = this.queue[this.curr++];
      if (!ele) break;
      count++;
      todo.push(ele);
    }
    return todo;
  }

  next(results = []) {
    const remain = results
      .filter((d) => !d.success)
      .map((result) => result.url);
    const todo = this.pick(remain);
    if (todo.length) {
      console.log(`batch: ${String(todo)}`);
      const arr = todo.map((d) => this.ajax(d));
      Promise.all(arr).then((resArr) => {
        this.next(resArr);
      });
    }
  }

  add(url) {
    this.queue.push(url);
  }

  run() {
    this.next();
  }
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
const mq = new MultiRequest(urls, 3);
console.log(mq);
mq.run();
setTimeout(() => {
  mq.add("url-10");
}, 200);
