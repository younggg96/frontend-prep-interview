// Given a string s, return true if the s can be palindrome after deleting at most one character from it.

 

// Example 1:

// Input: s = "aba"
// Output: true
// Example 2:

// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.
// Example 3:

// Input: s = "abc"
// Output: false
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    const arrStr = [...s];
    let l = 0, r = arrStr.length - 1;
    const check = (l, r, checked) => {
        if (l >= r) return true;
        if (arrStr[l] !== arrStr[r]) {
            if (checked) {
                return check(l, r - 1, false) || check(l + 1, r, false);
            } else {
                return false;
            }
        }
        return check(l + 1, r - 1, checked);
    }
    return check(l, r, true);
};