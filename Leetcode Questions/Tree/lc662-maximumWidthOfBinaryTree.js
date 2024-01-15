// Given the root of a binary tree, return the maximum width of the given tree.

// The maximum width of a tree is the maximum width among all levels.

// The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

// It is guaranteed that the answer will in the range of a 32-bit signed integer.

// Example 1:

// Input: root = [1,3,2,5,3,null,9]
// Output: 4
// Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
// Example 2:

// Input: root = [1,3,2,5,null,null,9,6,null,7]
// Output: 7
// Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).
// Example 3:

// Input: root = [1,3,2,5]
// Output: 2
// Explanation: The maximum width exists in the second level with length 2 (3,2).

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
const widthOfBinaryTree = (root) => {
  if (!root) return 0;
  const queue = [{ node: root, pos: 0 }];
  let maxWidth = 0;

  while (queue.length) {
    const len = queue.length;

    let min = Number.MAX_VALUE,
      max = 0;

    let initPos = queue[0].pos;

    for (let i = 0; i < len; i++) {
      const curr = queue.shift();
      min = Math.min(min, curr.pos);
      max = Math.max(max, curr.pos);

      if (curr.node.left)
        queue.push({ node: curr.node.left, pos: (curr.pos - initPos) * 2 });

      if (curr.node.right)
        queue.push({
          node: curr.node.right,
          pos: (curr.pos - initPos) * 2 + 1,
        });
    }

    const levelWidth = max - min + 1;
    maxWidth = Math.max(maxWidth, levelWidth);
  }

  return maxWidth;
};
var widthOfBinaryTree2 = function(root) {
    const left = [0];
    let maxWidth = 0;
    const dfs = (node, id, level) => {
        if(!node) return;
        if(left[level] === undefined) left.push(id);
        const width = id - left[level];
        maxWidth = Math.max(maxWidth, width + 1);
        dfs(node.left, width * 2, level + 1);
        dfs(node.right, width * 2 + 1, level + 1);
    }

    dfs(root, 0, 0);
    return maxWidth;

};
