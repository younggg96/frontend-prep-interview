// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

 

// Example 1:

// Input: nums = [2,2,1]
// Output: 1
// Example 2:

// Input: nums = [4,1,2,1,2]
// Output: 4
// Example 3:

// Input: nums = [1]
// Output: 1
 

// Constraints:

// 1 <= nums.length <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104
// Each element in the array appears twice except for one element which appears only once


// 异或运算的性质是需要我们牢记的：
// 一个数和它本身做异或运算结果为 0，即 a ^ a = 0；一个数和 0 做异或运算的结果为它本身，即 a ^ 0 = a。

// 我们只要把所有数字进行异或，成对儿的数字就会变成 0，
// 落单的数字和 0 做异或还是它本身，所以最后异或的结果就是只出现一次的元素

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for(let i = 0; i < nums.length; i++) {
        res ^= nums[i]
    }
    return res;
};