// Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses
// substring
// .

// Example 1:

// Input: s = "(()"
// Output: 2
// Explanation: The longest valid parentheses substring is "()".
// Example 2:

// Input: s = ")()())"
// Output: 4
// Explanation: The longest valid parentheses substring is "()()".
// Example 3:

// Input: s = ""
// Output: 0

// Constraints:

// 0 <= s.length <= 3 * 104
// s[i] is '(', or ')'.

// 注意：javascript 代码由 chatGPT🤖 根据我的 java 代码翻译，旨在帮助不同背景的读者理解算法逻辑。
// 本代码已经通过力扣的测试用例，应该可直接成功提交。

var longestValidParentheses = function (s) {
  let stk = [];
  // dp[i] 的定义：记录以 s[i-1] 结尾的最长合法括号子串长度
  let dp = new Array(s.length + 1).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "(") {
      // 遇到左括号，记录索引
      stk.push(i);
      // 左括号不可能是合法括号子串的结尾
      dp[i + 1] = 0;
    } else {
      // 遇到右括号
      if (stk.length > 0) {
        // 配对的左括号对应索引
        let leftIndex = stk.pop();
        // 以这个右括号结尾的最长子串长度
        let len = 1 + i - leftIndex + dp[leftIndex];
        dp[i + 1] = len;
      } else {
        // 没有配对的左括号
        dp[i + 1] = 0;
      }
    }
  }
  // 计算最长子串的长度
  let res = 0;
  for (let i = 0; i < dp.length; i++) {
    res = Math.max(res, dp[i]);
  }
  return res;
};

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const stack = [];
  const dp = new Array(s.length + 1).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "(") {
      stack.push(i);
      dp[i + 1] = 0;
    } else {
      if (stack.length > 0) {
        const leftIndex = stack.pop();
        const len = i + 1 - leftIndex + dp[leftIndex];
        dp[i + 1] = len;
      } else {
        dp[i + 1] = 0;
      }
    }
  }
  let res = 0;
  for (let i = 0; i < dp.length; i++) {
    res = Math.max(dp[i], res);
  }
  return res;
};
