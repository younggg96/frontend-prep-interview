/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    const build = (inL, inR, postL, postR) => {
        if(postL > postR) return null;
        const rootValue = postorder[postR];
        const res = new TreeNode(rootValue);
        const index = inorder.indexOf(rootValue);
        const leftSize = index - inL;
        res.left = build(inL, index - 1, postL, postL + leftSize - 1);
        res.right = build(index + 1, inR, postL + leftSize, postR - 1);
        return res;
    }
    return build(0, inorder.length - 1, 0, postorder.length - 1);
};