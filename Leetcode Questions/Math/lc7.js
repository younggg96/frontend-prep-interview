/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const arr = x.toString().split("");
  if (arr[0] === "-") {
    const res = +("-" + arr.slice(1).reverse().join(""));
    return res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31) ? 0 : res;
  } else {
    const reverseArr = [...arr].reverse();
    if (reverseArr[0] === "0") {
      const res = +reverseArr.slice(1).join("");
      return res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31) ? 0 : res;
    }
  }
  const res = +[...arr].reverse().join("");
  return res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31) ? 0 : res;
};
