// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:

// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

// Constraints:

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  let l = 0,
    r = n - 1;
  let top = 0,
    bot = m - 1;
  const res = [];
  while (res.length < n * m) {
    if (top <= bot) {
      for (let i = l; i <= r; i++) {
        res.push(matrix[top][i]);
      }
      top++;
    }
    if (l <= r) {
      for (let j = top; j <= bot; j++) {
        res.push(matrix[j][r]);
      }
      r--;
    }
    if (top <= bot) {
      for (let i = r; i >= l; i--) {
        res.push(matrix[bot][i]);
      }
      bot--;
    }
    if (l <= r) {
      for (let j = bot; j >= top; j--) {
        res.push(matrix[j][l]);
      }
      l++;
    }
  }
  return res;
};
