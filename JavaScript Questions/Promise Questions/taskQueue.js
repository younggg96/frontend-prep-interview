const createTaskQueue = () => {
  let isRunning = false;
  let queuedTask = null;
  const doTask = async (fn) => {
    isRunning = true;
    let task = fn;
    while (task) {
      const res = await task();
      task = queuedTask;
      queuedTask = null;
    }
    isRunning = false;
  };

  const run = (fn) => {
    if (!isRunning) {
      doTask();
    } else {
      queuedTask = fn;
    }
  };

  return { run };
};
