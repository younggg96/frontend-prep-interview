// 46. Permutations
// Medium
// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

// Example 3:
// Input: nums = [1]
// Output: [[1]]

// Constraints:
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// All the integers of nums are unique.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    
    // Backtracking function
    function backtrack(currentPermutation, remainingNums) {
        // Base case: if no more numbers to add, we have a complete permutation
        if (remainingNums.length === 0) {
            result.push([...currentPermutation]);
            return;
        }
        
        // Try adding each number in remainingNums
        for (let i = 0; i < remainingNums.length; i++) {
            // Add current number to our permutation
            currentPermutation.push(remainingNums[i]);
            
            // Create a new array of remaining numbers without the current number
            const newRemaining = [...remainingNums.slice(0, i), ...remainingNums.slice(i + 1)];
            
            // Recursive call with updated permutation and remaining numbers
            backtrack(currentPermutation, newRemaining);
            
            // Backtrack by removing the last number
            currentPermutation.pop();
        }
    }
    
    // Start backtracking with empty permutation and all numbers
    backtrack([], nums);
    
    return result;
}; 