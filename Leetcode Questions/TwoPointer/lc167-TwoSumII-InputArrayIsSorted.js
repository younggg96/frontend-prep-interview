/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while(l < r) {
        const sum = nums[l] + nums[r];
 
        if(target < sum) {
            r--;
        }
        if (target > sum) {
            l++;
        }
        if(target === sum) {
            return [l + 1, r + 1];
        }
    }
    return [];
};