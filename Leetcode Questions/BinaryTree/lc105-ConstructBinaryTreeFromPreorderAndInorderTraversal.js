/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    const build = (preL, preR, inL, inR) => {
        if(preL > preR) return null;
        const rootVal = preorder[preL];
        const res = new TreeNode(rootVal);
        const index = inorder.indexOf(rootVal);
        const leftSize = index - inL;
        res.left = build(preL + 1, preL + leftSize, inL, index - 1);
        res.right = build(preL + leftSize + 1, preR, index + 1, inR);
        return res;
    }
    return build(0, preorder.length - 1, 0, inorder.length - 1);
};