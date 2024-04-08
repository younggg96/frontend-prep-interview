// You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.

// In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.

// Return the minimum number of moves required to make every node have exactly one coin.


// Example 1:

// Input: root = [3,0,0]
// Output: 2
// Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.
// Example 2:

// Input: root = [0,3,0]
// Output: 3
// Explanation: From the left child of the root, we move two coins to the root [taking two moves]. Then, we move one coin from the root of the tree to the right child.

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
var distributeCoins = function (root) {
    let res = 0;
    const dfs = (node) => {
        if (!node) return { nodes: 0, coins: 0 };
        const left = dfs(node.left);
        const right = dfs(node.right);
        res += Math.abs(left.nodes - left.coins) + Math.abs(right.nodes - right.coins);
        return { nodes: left.nodes + right.nodes + 1, coins: left.coins + right.coins + node.val };
    }
    dfs(root)
    return res;
};


// 考虑每条边上的金币“流量”，如果当前节点u的某个子树v中，有x枚金币，y个节点。若x>y，
// 说明节点v到u要流上来x-y个金币；若x<y，说明节点u要往v流下去y-x个金币。
// 因此，我们可以DFS求得每条边的流量，树中所有边的流量之和就是总的移动次数。