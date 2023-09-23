// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

// Return the length of the longest substring containing the same letter you can get after performing the above operations.

// Example 1:

// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.
// Example 2:

// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.
// There may exists other ways to achive this answer too.

// Constraints:

// 1 <= s.length <= 105
// s consists of only uppercase English letters.
// 0 <= k <= s.length

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  let l = 0,
    r = 0;
  const map = {};
  let max = 0,
    longest = 0;
  const sArr = s.split("");
  while (r < s.length) {
    map[sArr[r]] = map[sArr[r]] + 1 || 1;
    max = Math.max(max, map[sArr[r]]);
    while (r - l + 1 - max > k) {
      map[sArr[l]]--;
      l++;
    }
    longest = Math.max(longest, r - l + 1);
    r++;
  }
  return longest;
};
