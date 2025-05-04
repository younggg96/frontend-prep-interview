// 1310. XOR Queries of a Subarray
/**
 * You are given an array arr of positive integers. You are also given the array queries where
 * queries[i] = [lefti, righti].
 * 
 * For each query i compute the XOR of elements from lefti to righti (that is, 
 * arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).
 * 
 * Return an array answer where answer[i] is the answer to the ith query.
 * 
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
    // 计算前缀XOR
    const prefixXor = new Array(arr.length + 1).fill(0);
    
    // 构建前缀XOR数组 (prefixXor[i]表示arr[0]到arr[i-1]的异或结果)
    for (let i = 0; i < arr.length; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ arr[i];
    }
    
    const result = [];
    
    // 计算每个查询的结果
    for (const [left, right] of queries) {
        // 利用前缀XOR的性质: 区间[left, right]的XOR = prefixXor[left] ^ prefixXor[right+1]
        // 这是因为a^a=0以及0^a=a的性质
        result.push(prefixXor[left] ^ prefixXor[right + 1]);
    }
    
    return result;
};

// 时间复杂度: O(n + q)，其中n是数组长度，q是查询数量
// 空间复杂度: O(n)，用于存储前缀XOR数组 