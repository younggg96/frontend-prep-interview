/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const leftProducts = new Array(nums.length).fill(1);

    let left = 1;
    for(let i = 0; i < nums.length; i++) {
        leftProducts[i] = left;
        left *= nums[i];
    }
    
    const res = new Array(nums.length).fill(1);
    let right = 1;
    for(let i = nums.length - 1; i >= 0; i--) {
        res[i] = leftProducts[i] * right;
        right = right * nums[i];
    }

    return res;
};