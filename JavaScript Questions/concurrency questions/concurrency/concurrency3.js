function promiseAllLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let running = 0;
    let index = 0; // next task to run
    let finished = 0;

    function runNext() {
      // All tasks done → resolve
      if (finished === tasks.length) {
        return resolve(results);
      }

      // Reached concurrency limit
      if (running >= limit) return;

      // No more tasks to run
      if (index >= tasks.length) return;

      const currentIndex = index++;
      const task = tasks[currentIndex];

      running++;

      task()
        .then((res) => {
          results[currentIndex] = res;
          running--;
          finished++;
          runNext(); // Continue next task
        })
        .catch((err) => {
          reject(err); // Fail fast like Promise.all
        });

      // Keep filling workers until reaching limit
      runNext();
    }

    runNext();
  });
}
