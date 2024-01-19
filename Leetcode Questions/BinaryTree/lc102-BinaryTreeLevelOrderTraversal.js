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
var levelOrder = function(root) {
    const res = [];
    if(!root) return res;
    const traverse = (node) => {
        const queue = [];
        queue.push(node);
        while(queue.length) {
            let len = queue.length;
            const level = [];
            for(let i = 0; i < len; i++) {
                const cur = queue.shift();
                level.push(cur.val);
                if(cur.left) queue.push(cur.left);
                if(cur.right) queue.push(cur.right);
            }
            res.push(level);
        }
    }
    traverse(root);
    return res;
};