/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function(root) {
    const res = [];
    if(!root) return res;
    const dfs = (node) => {
        if(node) {
            res.push(node.val);
            if(node.children) {
                for(let item of node.children) {
                    dfs(item);
                }
            }
        }
    }
    dfs(root);
    return res;
};