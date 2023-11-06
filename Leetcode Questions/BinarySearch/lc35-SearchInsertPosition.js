/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while(start <= end) {
        let mid = Math.floor((end + start) / 2);
        if(nums[mid] > target) {
            end = mid - 1;
        }
        if(nums[mid] < target) {
            start = mid + 1;
        }
        if(nums[mid] == target) {
            return mid;
        }
    }
    return start
};