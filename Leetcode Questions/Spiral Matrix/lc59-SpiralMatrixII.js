// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Example 1:

// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]
// Example 2:

// Input: n = 1
// Output: [[1]]

// Constraints:

// 1 <= n <= 20

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const res = new Array(n).fill(null).map(() => new Array(n).fill(0));
  let l = 0,
    r = n - 1,
    top = 0,
    bot = n - 1,
    num = 1;
  while (l <= r && top <= bot) {
    for (let i = l; i <= r; i++, num++) {
      res[top][i] = num;
    }
    top++;
    for (let i = top; i <= bot; i++, num++) {
      res[i][r] = num;
    }
    r--;
    for (let i = r; i >= l; i--, num++) {
      res[bot][i] = num;
    }
    bot--;
    for (let i = bot; i >= top; i--, num++) {
      res[i][l] = num;
    }
    l++;
  }
  return res;
};
