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
 * @return {boolean}
 */

var isBalanced = function (root) {
    if (!root || (!root.left && !root.right)) return true;
    const getDepth = (node) => {
        if (!node) return 0;
        return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
    }
    return Math.abs(getDepth(root.left) - getDepth(root.right)) < 2 && isBalanced(root.left) && isBalanced(root.right);
};