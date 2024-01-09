// Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

// The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    if(!root) return 0;
    const helper = (node, sum) => {
        if(!node) return 0;
        sum = sum - node.val;
        let count = 0;
        if(sum === 0) {
            count++;
        }
        return count + helper(node.left, sum) + helper(node.right, sum);
    }
    return helper(root, targetSum) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum);
};