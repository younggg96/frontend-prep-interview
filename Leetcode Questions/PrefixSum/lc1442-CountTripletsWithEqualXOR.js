// 1442. Count Triplets That Can Form Two Arrays of Equal XOR
/**
 * Given an array of integers arr.
 * 
 * We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).
 * 
 * Let's define a and b as follows:
 * a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
 * b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
 * 
 * Return the number of triplets (i, j, k) where a == b.
 * 
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    const n = arr.length;
    let count = 0;
    
    // 计算前缀XOR
    const prefixXor = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ arr[i];
    }
    
    // 遍历所有可能的i和k组合
    for (let i = 0; i < n; i++) {
        for (let k = i + 1; k < n; k++) {
            // 如果区间[i, k]的XOR为0，那么对于i<j<=k的所有j都是有效的
            // 因为如果prefixXor[i] ^ prefixXor[k+1] = 0，意味着arr[i] ^ ... ^ arr[k] = 0
            // 这表示对于任何i<j<=k，arr[i]^...^arr[j-1] = arr[j]^...^arr[k]
            if (prefixXor[i] === prefixXor[k + 1]) {
                // 对于每个i和k，j可以取i+1到k之间的任何值
                count += k - i;
            }
        }
    }
    
    return count;
};

// 优化版本，利用 a^b = 0 => a = b 的性质
var countTripletsOptimized = function(arr) {
    const n = arr.length;
    let count = 0;
    
    // 计算前缀XOR
    const prefixXor = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ arr[i];
    }
    
    // 遍历所有可能的区间
    for (let i = 0; i < n; i++) {
        for (let k = i + 1; k < n; k++) {
            // 如果prefixXor[i] == prefixXor[k+1]，表示arr[i]^arr[i+1]^...^arr[k] = 0
            // 这意味着对于任何i<j<=k，都有 a = b
            if (prefixXor[i] === prefixXor[k + 1]) {
                count += k - i;
            }
        }
    }
    
    return count;
};

// 时间复杂度: O(n²)，其中n是数组长度
// 空间复杂度: O(n)，用于存储前缀XOR数组 