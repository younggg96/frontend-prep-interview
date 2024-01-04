/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const res = [];
    if(!root) return res;
    const queue = [root];
    while(queue.length) {
        const level = [];
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const node = queue.shift();
            level.push(node.val);
            for(let item of node.children) {
               if(item) queue.push(item);
            }
        }
        res.push(level);
    }
    return res;
};