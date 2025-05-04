// 974. Subarray Sums Divisible by K
/**
 * Given an integer array nums and an integer k, return the number of non-empty subarrays 
 * that have a sum divisible by k.
 * 
 * A subarray is a contiguous part of an array.
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function(nums, k) {
    // 存储余数出现的次数，初始化余数0出现1次（空前缀）
    const remainderCount = new Map();
    remainderCount.set(0, 1);
    
    let sum = 0;
    let count = 0;
    
    for (let num of nums) {
        // 计算前缀和
        sum += num;
        
        // 计算当前前缀和除以k的余数，处理负数情况
        // JavaScript中，负数求余会得到负数，需要转换为正数
        let remainder = ((sum % k) + k) % k;
        
        // 如果之前出现过相同的余数，说明这两个前缀和之间的子数组和能被k整除
        if (remainderCount.has(remainder)) {
            count += remainderCount.get(remainder);
        }
        
        // 更新余数出现次数
        remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
    }
    
    return count;
};

// 时间复杂度: O(n)，其中n是数组长度
// 空间复杂度: O(k)，存储可能的余数，最多有k个 

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
    let count = 0, pre = 0;
    const map = new Map();
    map.set(0, 1);

    for (let i = 0; i < nums.length; i++) {
        pre += nums[i];
        const mod = ((pre % k) + k) % k;
        if (map.has(mod)) {
            count += map.get(mod);
        }
        map.set(mod, (map.get(mod) || 0) + 1);
    }
    return count;
};