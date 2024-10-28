// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".
// Example 2:

// Input: s = "abab", p = "ab"
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

// Constraints:

// 1 <= s.length, p.length <= 3 * 104
// s and p consist of lowercase English letters.

// /**
//  * @param {string} s
//  * @param {string} p
//  * @return {number[]}
//  */
// var findAnagrams = function (s, p) {
//   const res = [];
//   const pMap = new Map();
//   const sMap = new Map();
//   for (let i = 0; i < p.length; i++) {
//     const c = p[i];
//     if (pMap.has(c)) {
//       pMap.set(c, pMap.get(c) + 1);
//     } else {
//       pMap.set(c, 1);
//     }
//   }

//   let l = 0,
//     r = 0,
//     valid = 0;
//   while (r < s.length) {
//     const rChar = s[r];
//     r++;
//     if (pMap.has(rChar)) {
//       if (sMap.has(rChar)) {
//         sMap.set(rChar, sMap.get(rChar) + 1);
//       } else {
//         sMap.set(rChar, 1);
//       }
//       if (pMap.get(rChar) === sMap.get(rChar)) valid++;
//     }
//     while (r - l >= p.length) {
//       if (valid === pMap.size) {
//         res.push(l);
//       }
//       const lChar = s[l];
//       l++;
//       if (pMap.has(lChar)) {
//         if (pMap.get(lChar) === sMap.get(lChar)) valid--;
//         sMap.set(lChar, sMap.get(lChar) - 1);
//       }
//     }
//   }

//   return res;
// };


/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const res = [];
  

}