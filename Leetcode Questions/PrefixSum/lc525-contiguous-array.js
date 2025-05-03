// Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.


// Example 1:

// Input: nums = [0,1]
// Output: 2
// Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
// Example 2:

// Input: nums = [0,1,0]
// Output: 2
// Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
// Example 3:

// Input: nums = [0,1,1,1,1,1,0,0,0]
// Output: 6
// Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.

// Constraints:


// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
    let pre = 0, maxlen = 0;
    const map = new Map();
    map.set(0, -1);

    for(let i = 0; i < nums.length; i++) {
        pre += nums[i] === 0 ? -1 : 1;
        if(map.has(pre)) {
            const preIndex = map.get(pre);
            maxlen = Math.max(maxlen, i - preIndex);
        } else {
            map.set(pre, i);
        }

    }
    return maxlen;

};