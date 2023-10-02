// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

// You have the following three operations permitted on a word:

// Insert a character
// Delete a character
// Replace a character

// Example 1:

// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')
// Example 2:

// Input: word1 = "intention", word2 = "execution"
// Output: 5
// Explanation:
// intention -> inention (remove 't')
// inention -> enention (replace 'i' with 'e')
// enention -> exention (replace 'n' with 'x')
// exention -> exection (replace 'n' with 'c')
// exection -> execution (insert 'u')

// Constraints:

// 0 <= word1.length, word2.length <= 500
// word1 and word2 consist of lowercase English letters.

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;
  const memo = new Array(m + 1).map(() => new Array(n + 1).fill(-1));

  const min = (a, b, c) => {
    return Math.min(Math.min(a, b), c);
  };

  const dp = (s1, i, s2, j, memo) => {
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    if (s1[i] === s2[j]) {
      memo[i][j] = dp(s1, i - 1, s2, j - 1, memo);
    } else {
      memo[i][j] = min(
        dp(s1, i, s2, j - 1, memo),
        dp(s1, i - 1, s2, j, memo),
        dp(s1, i - 1, s2, j - 1, memo)
      );
    }
    return memo[i][j];
  };

  return dp(word1, m - 1, s2, n - 1, memo);
};
