// 70. Climbing Stairs
// Easy
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Constraints:
// 1 <= n <= 45

// /**
//  * @param {number} n
//  * @return {number}
//  */
// var climbStairs = function(n) {
//     if (n <= 2) return n;
    
//     // Initialize dp array
//     const dp = new Array(n + 1);
//     dp[1] = 1;
//     dp[2] = 2;
    
//     // Fill dp array
//     for (let i = 3; i <= n; i++) {
//         dp[i] = dp[i - 1] + dp[i - 2];
//     }
    
//     return dp[n];
// };

// /**
//  * @param {number} n
//  * @return {number}
//  */
// var climbStairsOptimized = function(n) {
//     if (n <= 2) return n;
    
//     let prev1 = 1;
//     let prev2 = 2;
    
//     for (let i = 3; i <= n; i++) {
//         const current = prev1 + prev2;
//         prev1 = prev2;
//         prev2 = current;
//     }
    
//     return prev2;
// }; 