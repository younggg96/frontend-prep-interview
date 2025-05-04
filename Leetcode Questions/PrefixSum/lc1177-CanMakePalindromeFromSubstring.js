// 1177. Can Make Palindrome from Substring
/**
 * You are given a string s and array queries where queries[i] = [lefti, righti, ki].
 * 
 * We may rearrange the substring s[lefti...righti] for each query and then choose up to ki 
 * of them to replace with any lowercase English letter.
 * 
 * If you can make the substring s[lefti...righti] a palindrome by performing the above 
 * operations, then answer true, otherwise answer false.
 * 
 * Return an array answer where answer[i] is the answer to the ith query.
 * 
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canMakePaliQueries = function(s, queries) {
    const n = s.length;
    
    // 构建前缀和数组，记录每个字符出现次数的奇偶性
    // 使用位运算，每个位表示一个字母a-z的奇偶性
    const prefixOddCounts = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        const charCode = s.charCodeAt(i) - 'a'.charCodeAt(0);
        // 异或操作用于切换字符的奇偶性状态
        prefixOddCounts[i + 1] = prefixOddCounts[i] ^ (1 << charCode);
    }
    
    const result = [];
    
    for (const [left, right, k] of queries) {
        // 计算区间[left, right]内的字符奇偶性状态
        const oddCount = countOddBits(prefixOddCounts[left] ^ prefixOddCounts[right + 1]);
        
        // 要使子串成为回文，需要将奇数次出现的字符配对
        // 每一对需要一次替换，总共需要oddCount/2次替换
        // 如果总字符数是奇数，可以将一个奇数次出现的字符放在中间
        // 所以如果oddCount/2 <= k，则可以通过最多k次替换使其成为回文
        result.push(Math.floor(oddCount / 2) <= k);
    }
    
    return result;
};

// 计算二进制表示中位为1的数量
function countOddBits(num) {
    let count = 0;
    
    // 遍历所有可能的26个字母位
    for (let i = 0; i < 26; i++) {
        if ((num & (1 << i)) !== 0) {
            count++;
        }
    }
    
    return count;
}

// 时间复杂度: O(n + q*1)，其中n是字符串长度，q是查询数量
// 空间复杂度: O(n + q)，用于存储前缀和数组和结果 