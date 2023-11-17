// 18. 4Sum
// Medium
// Topics
// Companies
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

 

// Example 1:

// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:

// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);

    const nSum = (n, t, start) => {
        const res = [];
        const helper = (helpStart, helpTarget) => {
            let l = helpStart, r = nums.length - 1;
            while (l < r) {
                let left = nums[l], right = nums[r];
                let sum = left + right;
                if (sum === helpTarget) {
                    res.push([left, right]);
                    while (l < r && left === nums[l]) l++;
                    while (l < r && right === nums[r]) r--;
                } else if (left + right < helpTarget) {
                    while (l < r && left === nums[l]) l++;
                } else {
                    while (l < r && right === nums[r]) r--;
                }
            }
        }
        if(n === 2) {
            helper(start, t);
        } else {
            for(let i = start; i < nums.length; i++) {
                const arr = nSum(n - 1, t - nums[i], i + 1);
                for(let j = 0; j < arr.length; j++) {
                    res.push([nums[i], ...arr[j]]);
                }
                while (i < nums.length && nums[i] === nums[i + 1]) i++;
            }
        }
        return res;
    }

    return nSum(4, target, 0);
};