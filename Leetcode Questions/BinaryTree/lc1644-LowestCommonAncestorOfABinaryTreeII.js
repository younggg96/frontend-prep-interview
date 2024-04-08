// Given the root of a binary tree, return the lowest common ancestor (LCA) of two given nodes, p and q. 
// If either node p or q does not exist in the tree, return null. All values of the nodes in the tree are unique.

// According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a binary tree 
// T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)". 
// A descendant of a node x is a node y that is on the path from node x to some leaf node.

var lowestCommonAncestor = function(root, p, q) {
    let count = 0;
    const dfs = (node) => {
        if(!node) return null;
        let left = dfs(node.left);
        let right = dfs(node.right);
        if(node === p || node === q) {
            count++;
            return node;
        }
        if(!left) return right;
        if(!right) return left;
        return node
    }
    let lca = dfs(root);
    return count === 2 ? lca : null
};