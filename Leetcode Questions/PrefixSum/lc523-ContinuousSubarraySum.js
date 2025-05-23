// 523. Continuous Subarray Sum
// Medium
// Given an integer array nums and an integer k, return true if nums has a continuous subarray of size at least two whose elements sum up to a multiple of k, or false otherwise.
// An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

// Example 1:
// Input: nums = [23,2,4,6,7], k = 6
// Output: true
// Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

// Example 2:
// Input: nums = [23,2,6,4,7], k = 6
// Output: true
// Explanation: [23, 2, 6, 4, 7] is a continuous subarray of size 5 whose elements sum up to 42.
// 42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

// Example 3:
// Input: nums = [23,2,6,4,7], k = 13
// Output: false

// Constraints:
// 1 <= nums.length <= 10^5
// 0 <= nums[i] <= 10^9
// 0 <= sum(nums[i]) <= 2^31 - 1
// 1 <= k <= 2^31 - 1 

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
    const map = new Map();
    map.set(0, -1);
    let pre = 0;

    // Handle the case when k is 0
    for (let i = 0; i < nums.length; i++) {
        
        pre += nums[i];
        // if map has the same pre % k, check if the distance is at least 2
        // if not, set the map with the current index
        if (map.has(pre % k)) {
            // if the distance is at least 2, return true
            if(i - map.get(pre % k) >= 2) {
                return true;
            }
        } else {
            map.set(pre % k, i)
        }
    }

    return false
};