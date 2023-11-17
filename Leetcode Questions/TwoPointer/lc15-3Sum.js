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