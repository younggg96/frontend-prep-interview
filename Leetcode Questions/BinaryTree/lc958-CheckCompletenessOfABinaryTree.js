// Given the root of a binary tree, determine if it is a complete binary tree.
// In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Example 1:

// Input: root = [1,2,3,4,5,6]
// Output: true
// Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.
// Example 2:


// Input: root = [1,2,3,4,5,null,7]
// Output: false
// Explanation: The node with value 7 isn't as far left as possible.gc

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
var isCompleteTree = function (root) {
    if (!root) return true;
    const queue = [root];
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const cur = queue.shift();
            if (!cur) {
                for (let node of queue) {
                    if (node) return false;
                }
                break;
            }
            queue.push(cur.left);
            queue.push(cur.right);
        }
    }
    return true;
};