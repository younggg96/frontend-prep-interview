// promise
const sleep = (delay = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

// timer
const sleep2 = (delay) => {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};

// const run = async () => {
//   console.log(1);
//   await sleep2(3000);
//   console.log(2);
// };

// run();
