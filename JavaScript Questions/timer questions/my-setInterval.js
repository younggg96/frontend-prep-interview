/**
 * 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 * @param {fn} fn
 * @param {time1} a
 * @param {time2} b
 * @returns clear func
 */
function mySetInterVal(fn, a, b) {
  let timer;
  function setOneTimer(fn, a, b) {
    timer = setTimeout(() => {
      fn();
      setOneTimer(fn, a + b, b);
    }, a);
  }
  setOneTimer(fn, a, b);
  return () => {
    clearTimeout(timer);
  };
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
