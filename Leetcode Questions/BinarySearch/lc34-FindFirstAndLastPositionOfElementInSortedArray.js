// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

 

// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:

// Input: nums = [], target = 0
// Output: [-1,-1]
 

// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums is a non-decreasing array.
// -109 <= target <= 109

var searchRange = function(nums, target) {
    // 判空
    if (nums == null || nums.length == 0) return [-1, -1];
    // 定义左右边界
    let left = 0,
        right = nums.length - 1;
    // 二分查找
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        }
    }
    // 判断是否找到
    if (left >= nums.length || nums[left] != target) return [-1, -1];
    let res = [left];
    // 寻找最右端的目标值索引
    right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] <= target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        }
    }
    res.push(right);
    return res;
};
