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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  if (!root) return false;
  if (!subRoot) return true;
  const isSameTree = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return (
      p.val === q.val &&
      isSameTree(p.left, q.left) &&
      isSameTree(p.right, q.right)
    );
  };
  return (
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot) ||
    isSameTree(root, subRoot)
  );
};
