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
var sumRootToLeaf = function(root) {
    const arr = [];
    if(!root) return 0;
    const dfs = (node, str) => {
        if(!node) return;
        const cur = str + node.val;
        if(!node.left && !node.right) {
            arr.push(cur);
        }
        dfs(node.left, cur);
        dfs(node.right, cur);
    }
    dfs(root, '');
    return arr.reduce((sum, item) => {
        sum += parseInt(item, 2);
        return sum;
    }, 0)
};