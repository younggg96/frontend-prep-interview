// class Scheduler {
//     add(promiseCreator) { ... }
//     // ...
//   }

//   const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
//   })

//   const scheduler = new Scheduler()
//   const addTask = (time, order) => {
//     scheduler.add(() => timeout(time)).then(() => console.log(order))
//   }

//   addTask(1000, '1')
//   addTask(500, '2')
//   addTask(300, '3')
//   addTask(400, '4')

//   // 打印顺序是：2 3 1 4

class Scheduler {
  constructor() {
    this.pendingState = [];
    this.doingJobs = 0;
  }

  add = (promiseCreator) => {
    return new Promise((resolve, reject) => {
      // 关键是给传过来的函数加个回调属性，当resolved的时候，就能返回对应的结果了。
      promiseCreator.resolve = resolve;
      promiseCreator.reject = reject;

      this.pendingState.push(promiseCreator);
      this.doJob();
    });
  };

  doJob = () => {
    if (this.doingJobs < 2) {
      if (this.pendingState.length) {
        this.doingJobs += 1;
        const job = this.pendingState.shift();

        job()
          .then((res) => {
            job.resolve(res);
          })
          .catch((e) => {
            job.reject(e);
          })
          .finally(() => {
            this.doingJobs -= 1;
            this.doJob();
          });
      }
    }
  };
}
