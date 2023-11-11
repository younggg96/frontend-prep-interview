// There is an integer array nums sorted in ascending order (with distinct values).

// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.

 

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:

// Input: nums = [1], target = 0
// Output: -1
 

// Constraints:

// 1 <= nums.length <= 5000
// -104 <= nums[i] <= 104
// All values of nums are unique.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l = 0, r = nums.length - 1, mid;
    while(l <= r) {
        mid = Math.floor((r + l) / 2);
        if(target === nums[mid]) return mid;
        if(nums[mid] >= nums[l]) {
            if(target >= nums[l] && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            if(target <= nums[r] && target > nums[mid]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }
    return -1;
};

// Original sorted array
// [1, 2, 3, 4, 5, 6, 7]

// After rotation, it might be something like
// [3, 4, 5, 6, 7, 1, 2]
// [6, 7, 1, 2, 3, 4, 5]
// [1, 2, 3, 4, 5, 6, 7] <-- rotated and end up the same
// and etc..

// When you divide the rotated array into two halves, using mid index, at least one of subarray should remain sorted ALWAYS.

// [3, 4, 5, 6, 7, 1, 2]
// -> [3, 4, 5] [ 6, 7, 1, 2]
// the left side remains sorted

// [6, 7, 1, 2, 3, 4, 5]
// -> [6, 7, 1] [2, 3, 4, 5]
// the right side remains sorted

// [1, 2, 3, 4, 5, 6, 7]
// -> [1, 2, 3] [4, 5, 6, 7]
// Both sides remain sorted.

// If you know one side is sorted, the rest of logic becomes very simple.
// If one side is sorted, check if the target is in the boundary, otherwise it's on the other side.

// IF smallest <= target <= biggest
//   then target is here
// ELSE
//   then target is on the other side