/**
 * 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 * @param {fn} fn
 * @param {time1} a
 * @param {time2} b
 * @returns clear func
 */
function mySetInterVal(fn, a, b) {
  let timer, count = 0;
  function run() {
    count++;
    const newTime = a + b * count;
    fn();
    timer = setTimeout(() => {
      console.log(newTime);
      run();
    }, newTime);
  }
  run();
  return () => clearTimeout(timer);

}

//test
const myClear = mySetInterVal(
  () => {
    console.log("run");
  },
  100,
  200
);
setTimeout(() => myClear(), 2000);




// /**
//  * @param {Function} func
//  * @param {number} delay
//  * @param {number} period
//  * @return {number}
//  */
// const map = new Map();
// let globalId = 0;
// function mySetInterval(func, delay, period) {
//   // your code here
//   let count = 0;
//   let id = globalId++;

//   const helper = () => {
//     const time = delay + period * count;
//     let timer = setTimeout(() => {
//       func();
//       count++;
//       helper();
//     }, time)
//     map.set(id, timer)
//   }

//   helper();
//   return id;
// }

// /**
//  * @param { number } id
//  */
// function myClearInterval(id) {
//   clearTimeout(map.get(id));
//   map.delete(id);
// }