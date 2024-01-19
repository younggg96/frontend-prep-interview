/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// ???? SAME -> lc 1123

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
    if (!root) return null;
let res = null;
let max = -1;
const dfs = (node, level) => {
  if (!node) {
    if (level > max) {
      max = level;
      res = node;
    }
    return level;
  }
  const leftLevel = dfs(node.left, level + 1);
  const rightLevel = dfs(node.right, level + 1);
  if (leftLevel === max && leftLevel === rightLevel) {
    res = node;
  }
  return Math.max(leftLevel, rightLevel);
};
dfs(root, 0);
return res;
};