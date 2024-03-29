// Given a n-ary tree, find its maximum depth.

// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

 

// Example 1:



// Input: root = [1,null,3,2,4,null,5,6]
// Output: 3
// Example 2:



// Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Output: 5
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) return 0;
    let max = 1;
    const helper = (node, level) => {
        if(!node) return;
        max = Math.max(max, level);
        for(let child of node.children) {
            helper(child, level + 1);
        }
    }
    helper(root, 1);
    return max;
};

var maxDepth = function(root) {
    if(!root) return 0;
    let max = 0;
    for(let node of root.children) {
        const depth = maxDepth(node);
        max = Math.max(max, depth);
    }
    return max + 1;
};