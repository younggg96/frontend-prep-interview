// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

// Example 1:

// Input: nums = [1,2,3,1], k = 3
// Output: true
// Example 2:

// Input: nums = [1,0,1,1], k = 1
// Output: true
// Example 3:

// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false
 

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109
// 0 <= k <= 105

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    const window = new Set();
    for(let i = 0; i < nums.length; i++) {
        if(window.has(nums[i])) {
            return true;
        }
        window.add(nums[i]);

        if(window.size > k) {
            window.delete(nums[i - k]);
        }

    }
    return false;
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    const window = [];
    for(let i = 0; i < nums.length; i++) {
        if(window.includes(nums[i])) {
            return true;
        }
        window.push(nums[i]);

        if(window.length > k) {
            window.shift();
        }

    }
    return false;
};