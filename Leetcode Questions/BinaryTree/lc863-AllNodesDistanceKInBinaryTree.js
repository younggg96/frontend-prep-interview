// Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

// You can return the answer in any order.

 

// Example 1:


// Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
// Output: [7,4,1]
// Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.
// Example 2:

// Input: root = [1], target = 1, k = 3
// Output: []
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
    const parents = new Map();
    const res = [];
    const findParents = (node) => {
        if (node.left) {
            parents.set(node.left.val, node);
            findParents(node.left);
        }
        if (node.right) {
            parents.set(node.right.val, node);
            findParents(node.right);
        }
    }
    findParents(root);
    const findAns = (node, from, depth) => {
        if (!node) return;
        if (depth === k) {
            res.push(node.val);
            return;
        }
        if (node.left !== from) {
            findAns(node.left, node, depth + 1);
        }
        if (node.right !== from) {
            findAns(node.right, node, depth + 1);
        }
        if (parents.get(node.val) !== from) {
            findAns(parents.get(node.val), node, depth + 1);
        }
    }
    findAns(target, null, 0);
    return res;
};

// 深度优先搜索 + 哈希表
// 若将 target 当作树的根结点，我们就能从 target 出发，使用深度优先搜索去寻找与 target 距离为 kkk 的所有结点，即深度为 kkk 的所有结点。

// 由于输入的二叉树没有记录父结点，为此，我们从根结点 root 出发，使用深度优先搜索遍历整棵树，同时用一个哈希表记录每个结点的父结点。

// 然后从 target 出发，使用深度优先搜索遍历整棵树，除了搜索左右儿子外，还可以顺着父结点向上搜索。

// 代码实现时，由于每个结点值都是唯一的，哈希表的键可以用结点值代替。此外，为避免在深度优先搜索时重复访问结点，递归时额外传入来源结点 from，在递归前比较目标结点是否与来源结点相同，
// 不同的情况下才进行递归。
