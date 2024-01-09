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
var findBottomLeftValue = function(root) {
    if(!root) return 0;
    const queue = [root];
    let res = 0;
    while(queue.length) {
        const node = queue.shift();
        if(node.right) queue.push(node.right);
        if(node.left) queue.push(node.left);
        res = node.val;
    }
    return res;
};