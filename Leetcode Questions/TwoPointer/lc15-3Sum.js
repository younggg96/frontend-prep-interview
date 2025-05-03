/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const res = [];
    if (!nums || !nums.length) return res;
    const helper = (start, target) => {
        let l = start, r = nums.length - 1;
        const result = [];
        while (l < r) {
            let left = nums[l], right = nums[r];
            let sum = left + right;
            if (sum === target) {
                result.push([left, right]);
                while (l < r && left === nums[l]) l++;
                while (l < r && right === nums[r]) r--;
            } else if (left + right < target) {
                while (l < r && left === nums[l]) l++;
            } else {
                while (l < r && right === nums[r]) r--;
            }
        }
        return result;
    }
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        const twoSumArr = helper(i + 1, -nums[i]);
        for (let j = 0; j < twoSumArr.length; j++) {
            res.push([nums[i], ...twoSumArr[j]]);
        }
        while (i < nums.length && nums[i] === nums[i + 1]) i++;
    }
    return res;
};

// 15. 3Sum
// Medium
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// Constraints:
// 3 <= nums.length <= 3000
// -10^5 <= nums[i] <= 10^5