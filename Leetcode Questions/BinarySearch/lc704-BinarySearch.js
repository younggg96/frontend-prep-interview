/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(!nums) return -1;
    let start = 0;
    let end = nums.length - 1;
    while(start <= end) {
        let mid = Math.floor((end - start) / 2) + start;
        if(target > nums[mid]) {
            start = mid + 1;
        }
        if(target < nums[mid]) {
            end = mid - 1;
        }
        if(target == nums[mid]) {
            return mid;
        }
    }
    return -1
};