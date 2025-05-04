// 1248. Count Number of Nice Subarrays
// Medium
// Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
// Return the number of nice sub-arrays.

// Example 1:
// Input: nums = [1,1,2,1,1], k = 3
// Output: 2
// Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

// Example 2:
// Input: nums = [2,4,6], k = 1
// Output: 0
// Explanation: There is no odd numbers in the array.

// Example 3:
// Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
// Output: 16

// Constraints:
// 1 <= nums.length <= 50000
// 1 <= nums[i] <= 10^5
// 1 <= k <= nums.length 

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    let count = 0;
    let pre = 0;
    const map = new Map();

    // 初始化map，将0作为key，1作为value存入map
    map.set(0, 1);

    // 遍历数组，计算前缀和
    for(let i = 0; i < nums.length; i++) {
        // 如果当前元素是奇数，则前缀和加1
        if(nums[i] % 2 === 1) {
            pre += 1;
        }

        // 如果map中存在pre - k，则count加上map中pre - k的 值
        if(map.has(pre - k)) {
            count += map.get(pre - k)
        }

        // 将pre作为key，pre的值作为value存入map
        // 如果map中不存在pre，则将pre的值设为1，否则将pre的值加1
        map.set(pre, (map.get(pre) || 0) + 1);
    }
    return count
};