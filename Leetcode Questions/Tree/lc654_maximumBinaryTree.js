// You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm:

// Create a root node whose value is the maximum value in nums.
// Recursively build the left subtree on the subarray prefix to the left of the maximum value.
// Recursively build the right subtree on the subarray suffix to the right of the maximum value.
// Return the maximum binary tree built from nums.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    if(!nums.length) return null;
    let max = nums[0];
    let index = 0;
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] > max) {
            max = nums[i];
            index = i;
        }
    }
    const res = new TreeNode(max);
    res.left = constructMaximumBinaryTree(nums.slice(0, index));
    res.right = constructMaximumBinaryTree(nums.slice(index + 1));
    return res;
};