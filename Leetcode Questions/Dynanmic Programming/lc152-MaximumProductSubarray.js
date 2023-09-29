// Given an integer array nums, find a
// subarray
//  that has the largest product, and return the product.

// The test cases are generated so that the answer will fit in a 32-bit integer.

// Example 1:

// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:

// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

// Constraints:

// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

/**
 * @param {number[]} nums
 * @return {number}
 */

const max = (a, b, c) => {
    return Math.max(Math.max(a, b), c);
}

const min = (a, b, c) => {
    return Math.min(Math.min(a, b), c);
}

var maxProduct = function (nums) {
  const dpMax = new Array(nums.length);
  const dpMin = new Array(nums.length);
  dpMax[0] = nums[0];
  dpMin[0] = nums[0];
  for (let i = 0; i < nums.length; i++) {
    dpMax[i] = max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i]);
    dpMin[i] = min(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i]);
  }
  let res = -Infinity;
  for(let i = 0; i < nums.length; i++) {
    res = Math.max(res, dpMax[i]);
  }

  return res;
};
