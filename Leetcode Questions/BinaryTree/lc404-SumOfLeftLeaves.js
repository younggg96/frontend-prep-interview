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
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    let sum = 0;
    if(!root) return sum;
    const helper = (node, bool) => {
        if(!node) return;
        if(!node.left && !node.right && bool) {
            sum += node.val;
        } else {
            helper(node.left, true);
            helper(node.right, false);
        }
    }
    helper(root, false);
    return sum;
};