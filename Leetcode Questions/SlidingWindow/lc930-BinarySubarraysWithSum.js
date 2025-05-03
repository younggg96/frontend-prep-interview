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