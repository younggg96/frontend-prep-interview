// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

 

// Example 1:


// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true
// Example 2:


// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// Output: false

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    let m = matrix.length, n = matrix[0].length;
    let l = 0, r = m * n - 1, mid;
    while(l <= r) {
        mid = Math.floor((l + r) / 2);
        const midNum = matrix[Math.floor(mid / n)][mid % n];
        if(midNum > target) r = mid - 1;
        if(midNum < target) l = mid + 1;
        if(midNum === target) return true;
    }
    return false;
};