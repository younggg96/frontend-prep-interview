/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let ans = 0;
    let count = 0;
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === 1) {
            count++;
           if(count > ans) ans = count;
        } else {
            count = 0;
        }
    }
    return ans;
};