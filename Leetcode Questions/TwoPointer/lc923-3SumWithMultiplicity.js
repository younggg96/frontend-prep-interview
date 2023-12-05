// Given an integer array arr, and an integer target, return the number of tuples i, j, k such that i < j < k and arr[i] + arr[j] + arr[k] == target.

// As the answer can be very large, return it modulo 109 + 7.

// Example 1:

// Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
// Output: 20
// Explanation:
// Enumerating by the values (arr[i], arr[j], arr[k]):
// (1, 2, 5) occurs 8 times;
// (1, 3, 4) occurs 8 times;
// (2, 2, 4) occurs 2 times;
// (2, 3, 3) occurs 2 times.
// Example 2:

// Input: arr = [1,1,2,2,2,2], target = 5
// Output: 12
// Explanation:
// arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
// We choose one 1 from [1,1] in 2 ways,
// and two 2s from [2,2,2,2] in 6 ways.
// Example 3:

// Input: arr = [2,1,3], target = 6
// Output: 1
// Explanation: (1, 2, 3) occured one time in the array so we return 1.

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (arr, target) {
  const mod = 1000000007;
  let counter = new Map();
  arr.forEach((value) => {
    if (!counter.has(value)) {
      counter.set(value, 1);
    } else {
      counter.set(value, counter.get(value) + 1);
    }
  });

  let uniqNums = Array.from(counter.keys());
  uniqNums.sort((a, b) => a - b);

  let res = 0;
  for (let i = 0; i < uniqNums.length; i++) {
    let ni = counter.get(uniqNums[i]);
    if (uniqNums[i] * 3 === target && counter.get(uniqNums[i]) >= 3) {
      res += (ni * (ni - 1) * (ni - 2)) / 6;
    }
    for (let j = i + 1; j < uniqNums.length; j++) {
      let nj = counter.get(uniqNums[j]);
      if (
        uniqNums[i] * 2 + uniqNums[j] === target &&
        counter.get(uniqNums[i]) > 1
      ) {
        res += (ni * (ni - 1) * nj) / 2;
      }
      if (
        uniqNums[j] * 2 + uniqNums[i] === target &&
        counter.get(uniqNums[j]) > 1
      ) {
        res += (nj * (nj - 1) * ni) / 2;
      }
      let c = target - uniqNums[i] - uniqNums[j];
      if (c > uniqNums[j] && counter.has(c)) {
        res += ni * nj * counter.get(c);
      }
    }
  }
  return res % mod;
};
