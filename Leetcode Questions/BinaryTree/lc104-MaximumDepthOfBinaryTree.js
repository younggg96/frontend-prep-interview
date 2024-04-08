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
var maxDepth = function(root) {
    if(!root) return 0;
    let res = 0;
    let d = 0
    const dfs = (node) => {
        if(!node) return;
        d++;
        res = Math.max(res, d);
        dfs(node.left);
        dfs(node.right);
        d--;
    }
    dfs(root);
    return res;
};


var maxDepth = function(root) {
    if(!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};