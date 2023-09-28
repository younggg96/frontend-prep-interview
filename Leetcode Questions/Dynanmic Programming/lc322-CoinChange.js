// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

 

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Example 3:

// Input: coins = [1], amount = 0
// Output: 0
 

// Constraints:

// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    return dp(coins, amount);
};
// 暴力
const dp = (coins, amount) => {
    if (amount == 0) return 0;
    if (amount < 0) return -1;
    let min = Number.MAX_VALUE;
    for (let coin of coins) {
        const res = dp(coins, amount - coin);
        if (res === -1) continue;
        min = Math.min(min, res + 1);
    }
    return min === Number.MAX_VALUE ? -1 : min;
}


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const memo = new Array(amount + 1).fill(-999);
    const dp = (coins, amount) => {
        if (amount == 0) return 0;
        if (amount < 0) return -1;
        if (memo[amount] !== -999) return memo[amount];
        let res = Number.MAX_VALUE;
        for (let coin of coins) {
            const sub = dp(coins, amount - coin);
            if (sub === -1) continue;
            res = Math.min(res, sub + 1);
        }
        memo[amount] = (res === Number.MAX_VALUE) ? -1 : res;
        return memo[amount]
    }
    return dp(coins, amount);
}

