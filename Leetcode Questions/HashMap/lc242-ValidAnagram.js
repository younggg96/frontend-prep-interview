// 242. Valid Anagram
// Easy
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true

// Example 2:
// Input: s = "rat", t = "car"
// Output: false

// Constraints:
// 1 <= s.length, t.length <= 5 * 10^4
// s and t consist of lowercase English letters.

// /**
//  * @param {string} s
//  * @param {string} t
//  * @return {boolean}
//  */
// var isAnagram = function(s, t) {
//     if (s.length !== t.length) return false;
    
//     const charCount = {};
    
//     // Count characters in string s
//     for (let char of s) {
//         charCount[char] = (charCount[char] || 0) + 1;
//     }
    
//     // Decrement count for each character in t
//     for (let char of t) {
//         if (!charCount[char]) return false;
//         charCount[char]--;
//     }
    
//     // Make sure all counts are zero
//     for (let char in charCount) {
//         if (charCount[char] !== 0) return false;
//     }
    
//     return true;
// };

// /**
//  * @param {string} s
//  * @param {string} t
//  * @return {boolean}
//  */
// var isAnagramSort = function(s, t) {
//     return s.split('').sort().join('') === t.split('').sort().join('');
// }; 