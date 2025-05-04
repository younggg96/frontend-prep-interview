// 930. Binary Subarrays With Sum
// Medium
// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
// A subarray is a contiguous part of the array.

// Example 1:
// Input: nums = [1,0,1,0,1], goal = 2
// Output: 4
// Explanation: The 4 subarrays are:
// - [1,0,1,0,1] from index 0 to 4 with sum 3
// - [1,0,1] from index 0 to 2 with sum 2
// - [1,0,1] from index 2 to 4 with sum 2
// - [0,1,0,1] from index 1 to 4 with sum 2

// Example 2:
// Input: nums = [0,0,0,0,0], goal = 0
// Output: 15

// Constraints:
// 1 <= nums.length <= 3 * 10^4
// nums[i] is either 0 or 1.
// 0 <= goal <= nums.length 

/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function(nums, goal) {
    let count = 0;
    let pre = 0;
    const map = new Map();

    map.set(0, 1);

    for(let i = 0; i < nums.length; i++) {
        pre += nums[i];
        if(map.has(pre - goal)) {
            count += map.get(pre - goal);
        }
        map.set(pre, (map.get(pre) || 0) + 1);
    }
    return count;
};