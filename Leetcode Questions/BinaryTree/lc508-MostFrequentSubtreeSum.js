// Given the root of a binary tree, return the most frequent subtree sum. If there is a tie, return all the values with the highest frequency in any order.

// The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).
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
var findFrequentTreeSum = function(root) {
    if(!root) return [0];
    let max = -Infinity;
    const map = new Map();
    const helper = (node) => {
        if(!node) return 0;
        const left = helper(node.left);
        const right = helper(node.right);
        const sum = node.val + left + right;
        map.set(sum, (map.get(sum) || 0) + 1);
        max = Math.max(max, map.get(sum));
        return sum;
    }
    helper(root);
    const keys = [...map.keys()];
    const arr = [];
    for(let i = 0; i < keys.length; i++) {
        if(map.get(keys[i]) === max) {
            arr.push(keys[i]);
        }
    }
    return arr;
};