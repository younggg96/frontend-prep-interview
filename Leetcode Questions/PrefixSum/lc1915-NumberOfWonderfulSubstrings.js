// 1915. Number of Wonderful Substrings
/**
 * A wonderful string is a string where at most one letter appears an odd number of times.
 * 
 * Given a string word that consists of the first ten lowercase English letters ('a' through 'j'),
 * return the number of wonderful non-empty substrings in word. If the same substring appears 
 * multiple times in word, then count each occurrence separately.
 * 
 * A substring is a contiguous sequence of characters in a string.
 * 
 * @param {string} word
 * @return {number}
 */
var wonderfulSubstrings = function(word) {
    // 使用前缀和 + 状态压缩的方法
    // 记录每个字符出现次数的奇偶性状态，初始化前缀和0出现1次（空前缀）
    const maskCount = new Map();
    maskCount.set(0, 1);
    
    let currentMask = 0;
    let count = 0;
    
    for (const char of word) {
        // 更新当前前缀的奇偶性状态（0-9位分别代表a-j）
        const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);
        currentMask ^= (1 << charIndex);
        
        // 情况1: 所有字符都出现偶数次
        // 如果之前出现过相同的前缀和，则它们之间的子数组满足所有字符出现偶数次
        if (maskCount.has(currentMask)) {
            count += maskCount.get(currentMask);
        }
        
        // 情况2: 恰好一个字符出现奇数次
        // 尝试在当前前缀和的每一位上翻转一次，检查是否存在之前的前缀和
        for (let i = 0; i < 10; i++) {
            const targetMask = currentMask ^ (1 << i);
            if (maskCount.has(targetMask)) {
                count += maskCount.get(targetMask);
            }
        }
        
        // 更新当前前缀和出现的次数
        maskCount.set(currentMask, (maskCount.get(currentMask) || 0) + 1);
    }
    
    return count;
};

// 优化版本，避免重复计算
var wonderfulSubstringsOptimized = function(word) {
    // 使用数组替代Map，因为掩码最多有2^10种可能（0到1023）
    const maskCount = new Array(1024).fill(0);
    maskCount[0] = 1; // 初始化空前缀
    
    let currentMask = 0;
    let count = 0;
    
    for (const char of word) {
        // 更新当前前缀的奇偶性状态
        const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);
        currentMask ^= (1 << charIndex);
        
        // 情况1: 添加所有字符都出现偶数次的子数组
        count += maskCount[currentMask];
        
        // 情况2: 添加恰好一个字符出现奇数次的子数组
        for (let i = 0; i < 10; i++) {
            count += maskCount[currentMask ^ (1 << i)];
        }
        
        // 更新当前前缀和出现的次数
        maskCount[currentMask]++;
    }
    
    return count;
};

// 时间复杂度: O(n * 10) = O(n)，其中n是字符串长度
// 空间复杂度: O(2^10) = O(1024) = O(1)，用于存储前缀和的计数 