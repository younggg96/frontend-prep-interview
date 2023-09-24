// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n),
// ans[i] is the number of 1's in the binary representation of i.

// Example 1:

// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// Example 2:

// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101

// Constraints:

// 0 <= n <= 105

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const res = [];
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let j = i;
    // console.log(j);
    while (j) {
      if (j % 2 === 1) {
        count++;
      }
      console.log(j);
      j = Math.floor(j / 2);
    }
    res.push(count);
  }
  return res;
};

// 1.定义状态 二进制，一个数的二倍只是左移一位，１的数量不变
// 一个奇数的　n 二进制中包含的１的数量，就比ｎ－１多一个，
//  一个偶数　ｎ　二进制中包含的１的数量，和ｎ／２一样多．

var countBits2 = function (n) {
  let dp = [0];
  for (let i = 1; i < n + 1; i++) {
    if (i % 2 === 1) {
      dp[i] = dp[i - 1] + 1;
    } else {
      dp[i] = dp[i / 2];
    }
  }
  console.log(dp);
  return dp;
};

countBits2(5);

// Follow up:

// It is very easy to come up with a solution with a runtime of O(n log n).
// Can you do it in linear time O(n) and possibly in a single pass?
// Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?
