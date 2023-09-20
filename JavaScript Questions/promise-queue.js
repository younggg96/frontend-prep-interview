class PromiseQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;

      task().then(() => {
        this.running--;
        this.next();
      });
    }
  }
}

// 示例用法
const queue = new PromiseQueue(2); // 允许最多 2 个并发任务

function simulateAsyncTask(id, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve();
    }, delay);
  });
}

queue.add(() => simulateAsyncTask(1, 1000)); // 开始执行任务1
queue.add(() => simulateAsyncTask(2, 1000)); // 开始执行任务2
queue.add(() => simulateAsyncTask(3, 1000)); // 等待，直到任务1或任务2完成
queue.add(() => simulateAsyncTask(4, 1000)); // 等待，直到任务1或任务2完成
