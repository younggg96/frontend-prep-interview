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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
    const res = [];
    if (!root) return res;
    const traverse = (node) => {
        const queue = [];
        queue.push(node);
        while (queue.length) {
            let len = queue.length;
            const level = [];
            let sum = 0;
            for (let i = 0; i < len; i++) {
                const cur = queue.shift();
                level.push(cur.val);
                sum += cur.val;
                if (cur.left) queue.push(cur.left);
                if (cur.right) queue.push(cur.right);
            }
            res.push(sum / level.length);
        }
    }
    traverse(root);
    return res;
};

var averageOfLevels = function(root) {
    if(!root) return [];
    const res = [], allLevels = [];
    dfs(root, 0, allLevels);
    allLevels.forEach((arr) => {
        let level = 0;
        arr.forEach((item) => level += item)
        res.push(level / arr.length);
    })
    return res;
    
};

const dfs = (node, level, res) => {
    if(!node) return null;
    if(!res[level]) res[level] = [];
    res[level].push(node.val);
    dfs(node.left, level + 1, res);
    dfs(node.right, level + 1, res);
}