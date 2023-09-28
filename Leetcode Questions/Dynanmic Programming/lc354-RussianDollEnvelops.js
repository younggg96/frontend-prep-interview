// You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi]
// represents the width and the height of an envelope.

// One envelope can fit into another if and only if both the width and height of
// one envelope are greater than the other envelope's width and height.

// Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

// Note: You cannot rotate an envelope.

// Example 1:

// Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
// Output: 3
// Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
// Example 2:

// Input: envelopes = [[1,1],[1,1],[1,1]]
// Output: 1

// Constraints:

// 1 <= envelopes.length <= 105
// envelopes[i].length == 2
// 1 <= wi, hi <= 105

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  const n = envelopes.length;
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    } else {
      return a[0] - b[0];
    }
  });

  const heightArr = new Array(n);
  for(let i = 0; i < n; i++) {
    heightArr[i] = envelopes[i][1];
  }

  const lengthOfLIS = (arr) => {
    const dp = new Array(n + 1).fill(1);
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    let res = 0;
    for(let i = 0; i < dp.length; i++) {
        res = Math.max(res, dp[i]);
    }
    return res;
  }

  return lengthOfLIS(heightArr);
};


var lengthOfLIS = function(nums) {
    var top = new Array(nums.length).fill(0);
    // 牌堆数初始化为 0
    var piles = 0;
    for (var i = 0; i < nums.length; i++) {
        // 要处理的扑克牌
        var poker = nums[i];
        /***** 搜索左侧边界的二分查找 *****/
        var left = 0, right = piles;
        while (left < right) {
            var mid = Math.floor((left + right) / 2);
            if (top[mid] > poker) {
                right = mid;
            } else if (top[mid] < poker) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        /*********************************/
        
        // 没找到合适的牌堆，新建一堆
        if (left == piles) piles++;
        // 把这张牌放到牌堆顶
        top[left] = poker;
    }
    // 牌堆数就是 LIS 长度
    return piles;
};