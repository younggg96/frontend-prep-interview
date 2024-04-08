// Given the root of a binary tree, each node in the tree has a distinct value.

// After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).

// Return the roots of the trees in the remaining forest. You may return the result in any order.

 

// Example 1:


// Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
// Output: [[1,2,null,4],[6],[7]]
// Example 2:

// Input: root = [1,2,4,null,3], to_delete = [3]
// Output: [[1,2,4]]
 
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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
    const toDelete = new Set(to_delete);
    const roots = new Set([root]);
    const dfs = (node, parent) => {
        if(toDelete.has(node.val)) {
            node.left && roots.add(node.left);
            node.right && roots.add(node.right);
            if(!parent) return roots.delete(node);
            parent[parent.left === node ? 'left' : 'right'] = null;
        }
        node.left && dfs(node.left, node);
        node.right && dfs(node.right, node);
    }
    for(let r of roots) {
        dfs(r, null);
    }
    return [...roots];
};