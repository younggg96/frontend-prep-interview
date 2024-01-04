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
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    const arr = [], res = [];
    if(!root) return res;
    const traverse = (node, col, row) => {
        if(!node) return;
        arr.push({val: node.val, col, row});
        traverse(node.left, col - 1, row + 1);
        traverse(node.right, col + 1, row + 1);
    }
    traverse(root, 0, 0);
    arr.sort((a, b) => {
        if(a.col === b.col && a.row === b.row) {
            return a.val - b.val;
        }
        if(a.col === b.col) {
            return a.row - b.row;
        }
        return a.col - b.col;
    })
    let col = Number.MIN;
    arr.forEach((item) => {
        if(col !== item.col) {
            col = item.col;
            res.push([]);
        }
        res[res.length - 1].push(item.val);
    })
    return res
};