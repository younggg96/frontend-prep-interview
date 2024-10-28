const originalSetInterval = window.setInterval;

const timer = [];
window.setInterval = function (callback, delay) {
  const id = originalSetInterval(callback, delay);
  timer.push(id);
  return id;
};

function clearAllIntervals() {
  timer.forEach((id) => {
    clearInterval(id);
  });
}

const func1 = () => console.log("func1");
const func2 = () => console.log("func2");
const func3 = () => console.log("func3");

setInterval(func1, 1000);
setInterval(func2, 2000);
setInterval(func3, 3000);

setTimeout(() => {
  clearAllIntervals();
}, 1500);
