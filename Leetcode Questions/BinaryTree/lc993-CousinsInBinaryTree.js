// Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, 
// return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

// Two nodes of a binary tree are cousins if they have the same depth with different parents.

// Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function(root, x, y) {
    const res = [];
    const dfs = (level, node, parent) => {
        if(!node) return false;
        if(node.val === x) {
            res.push({node, parent: level === 0 ? null : parent.val, level})
        }
        if(node.val === y) {
            res.push({node, parent: level === 0 ? null : parent.val, level})
        }
        if(res.length === 2) {
            if(res[0].parent !== res[1].parent && res[0].level === res[1].level) {
                return true;
            } else {
                return false;
            }
        }
        return dfs(level + 1, node.left, node) || dfs(level + 1, node.right, node);
    }
    return dfs(0, root, null);
};