// Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

 

// Example 1:


// Input: root = [1,3,2,5,3,null,9]
// Output: [1,3,9]
// Example 2:

// Input: root = [1,2,3]
// Output: [1,3]
 

// Constraints:

// The number of nodes in the tree will be in the range [0, 104].
// -231 <= Node.val <= 231 - 1

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
 * @return {number[]}
 */
var largestValues = function (root) {
    const res = [];
    if (!root) return res;
    const traverse = (node) => {
        const queue = [];
        queue.push(node);
        while (queue.length) {
            const len = queue.length;
            let max = -Infinity;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                if(node.val > max) {
                    max = node.val;
                }
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            res.push(max);
        }
    }
    traverse(root);
    return res;
};