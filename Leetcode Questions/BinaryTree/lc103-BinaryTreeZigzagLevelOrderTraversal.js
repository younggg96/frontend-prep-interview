// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. 
// (i.e., from left to right, then right to left for the next level and alternate between).
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
var zigzagLevelOrder = function(root) {
    const res = [];
    if(!root) return res;
    let flag = true;
    const traverse = (node) => {
        const queue = [];
        queue.push(node);
        while(queue.length) {
            let len = queue.length;
            const level = [];
            for(let i = 0; i < len; i++) {
                const cur = queue.shift();
                if(flag) {
                    level.push(cur.val);
                } else {
                    level.unshift(cur.val);
                }
                if(cur.left) queue.push(cur.left);
                if(cur.right) queue.push(cur.right);
            }
            flag = !flag;
            res.push(level)
        }
    }
    traverse(root);
    return res;
};