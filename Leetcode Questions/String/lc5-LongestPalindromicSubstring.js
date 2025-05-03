// 5. Longest Palindromic Substring
// Medium
// Given a string s, return the longest palindromic substring in s.

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Example 2:
// Input: s = "cbbd"
// Output: "bb"

// Constraints:
// 1 <= s.length <= 1000
// s consist of only digits and English letters.

// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function(s) {
//     if (s.length < 2) return s;
    
//     let start = 0;
//     let maxLength = 1;
    
//     function expandAroundCenter(left, right) {
//         while (left >= 0 && right < s.length && s[left] === s[right]) {
//             const currentPalindromeLength = right - left + 1;
//             if (currentPalindromeLength > maxLength) {
//                 maxLength = currentPalindromeLength;
//                 start = left;
//             }
//             left--;
//             right++;
//         }
//     }
    
//     for (let i = 0; i < s.length; i++) {
//         // Odd length palindrome (e.g., "aba")
//         expandAroundCenter(i, i);
        
//         // Even length palindrome (e.g., "abba")
//         expandAroundCenter(i, i + 1);
//     }
    
//     return s.substring(start, start + maxLength);
// }; 