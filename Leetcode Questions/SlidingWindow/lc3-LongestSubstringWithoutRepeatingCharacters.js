// 3. Longest Substring Without Repeating Characters
// Medium
// Given a string s, find the length of the longest substring without repeating characters.

// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Constraints:
// 0 <= s.length <= 5 * 10^4
// s consists of English letters, digits, symbols and spaces.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let left = 0;
    const charMap = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If we've seen this character before and its index is >= left pointer
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            // Move left pointer to the position after the last occurrence of the current character
            left = charMap.get(currentChar) + 1;
        }
        
        // Update the index of the current character
        charMap.set(currentChar, right);
        
        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringSet = function(s) {
    let maxLength = 0;
    let left = 0;
    const charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If the current character is in our set, remove characters from the left
        // until we can add the current character without duplicates
        while (charSet.has(currentChar)) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add the current character to our set
        charSet.add(currentChar);
        
        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
};


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0, max = 0;
    const map = new Map();
    for(let r = 0; r < s.length; r++) {
        const curChar = s[r];
        if(map.has(curChar) && map.get(curChar) >= l) {
            l = map.get(curChar) + 1;
        }
        map.set(curChar, r);
        max = Math.max(max, r - l + 1);
    }
    return max;
};