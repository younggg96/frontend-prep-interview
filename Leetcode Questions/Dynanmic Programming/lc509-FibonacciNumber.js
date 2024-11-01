// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
// Example 2:

// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
// Example 3:

// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

// Approach 1 - Recursion
// Time: O(2^n)
// Space: O(n)
function fib(n) {
  if (n < 2) return n;
  return fib(n-1) + fib(n-2);
}
// Approach 2 - Memoized Recursion
// Time: O(n)
// Space: O(n)
function fib(n) {
  const cache = {};
  function memo(n) {
    if (n < 2) return n;
    cache[n] ??= memo(n-1) + memo(n-2);
    return cache[n];
  }
  return memo(n);
}


/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
};

var fib = function (n) {
  const memo = new Array(n + 1).fill(0);
  const fibMemo = (n) => {
    if (n < 2) return n;
    if (memo[n] !== 0) return memo[n];
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
  };
  return fibMemo(n);
};

var fib = function (n) {
  if (n === 0) return 0;
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

var fib = function (n) {
  if (n === 0 || n === 1) {
    // base case
    return n;
  }
  // 分别代表 dp[i - 1] 和 dp[i - 2]
  let dp_i_1 = 1,
    dp_i_2 = 0;
  for (let i = 2; i <= n; i++) {
    // dp[i] = dp[i - 1] + dp[i - 2];
    let dp_i = dp_i_1 + dp_i_2;
    // 滚动更新
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i;
  }
  return dp_i_1;
};
