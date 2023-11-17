/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let l = 0, r = nums.length - 1;
    const numsWithIndex = nums.map((num,index) => ({num,index}))
    numsWithIndex.sort((a, b) => a.num - b.num);
    while(l < r) {
        const sum = numsWithIndex[l].num + numsWithIndex[r].num;
 
        if(target < sum) {
            r--;
        }
        if (target > sum) {
            l++;
        }
        if(target === sum) {
            return [numsWithIndex[l].index, numsWithIndex[r].index];
        }
    }
    return [];
};