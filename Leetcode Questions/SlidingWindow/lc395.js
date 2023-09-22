// Given a string s and an integer k, return the length of the longest substring of s
// such that the frequency of each character in this substring is greater than or equal to k.

// if no such substring exists, return 0.

// Example 1:

// Input: s = "aaabb", k = 3
// Output: 3
// Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
// Example 2:

// Input: s = "ababbc", k = 2
// Output: 5
// Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.

// Constraints:

// 1 <= s.length <= 104
// s consists of only lowercase English letters.
// 1 <= k <= 105

//approach: Sliding window
//it mentions 'substring', 'repeating characters'

//since each letter has to be 'greater or equal to k'.
//we will count all unique letter in s. We can use Set to do so.
//
//we will try to get the possible longest substring within the range from 1 to UniqueLetterMax.
//we start from 1, as there has to be at least 1 unqiue letter in s. so yea,
//we want to find the longest length of that unqiue letter, so we keep expanding our window to find that letter,
//once we stumble upon another letter, we will shrink the window.
//
//time --> O(26) * O(n) = O(n)
//space --> at most  = O(26) //since we are only looking at the letters.
var longestSubstring = function (s, k) {
  let uniqueLetterMax = new Set(s).size;
  let max = 0;

  //this loop accounts for individual letter
  for (let i = 1; i <= uniqueLetterMax; i++) {
    //at worst case, could run 26 times,(since alphabet)

    let right = 0;
    let left = 0;
    let map = new Map();
    let currUnique = 0; //goal is to hold one letter at a time
    let kCount = 0; //goal is to hold the letter count that matches k criteria
    while (right < s.length) {
      //runs O(n)

      map.set(s[right], (map.get(s[right]) || 0) + 1);

      //if value is 1, we know we found a new unique letter
      if (map.get(s[right]) === 1) currUnique++;

      //if the value == k, we know, this unique letter matches the criteria, and we can count the length of this letter
      if (map.get(s[right]) === k) kCount++;

      //we shrink because, currUnique holds more than 1 unique letter.
      while (currUnique > i) {
        //since, shrinking, we want to reduce the kCount, so we can make space for letter count for another letter
        if (map.get(s[left]) === k) kCount--;

        map.set(s[left], map.get(s[left]) - 1);

        //since, shrinking, we want to try to make sure we remove the previous letter count, and only care of new letter count
        if (map.get(s[left]) === 0) currUnique--;

        left++;
      }

      //since the letter we are looking right now, has the length of k or greater
      if (currUnique === kCount) max = Math.max(max, right - left + 1);

      right++;
    }
  }

  return max;
};
