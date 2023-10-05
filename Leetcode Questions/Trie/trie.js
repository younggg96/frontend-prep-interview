// Trie 树原理
// Trie 树本质上就是一棵从二叉树衍生出来的多叉树。

// 二叉树节点的代码实现是这样：
var TreeNode = function() {
    var val;
    var left;
    var right;
};

// 多叉树节点的代码实现是这样
var TreeNode2 = function() {
    this.val = 0;
    this.children = [];
};

// 其中 children 数组中存储指向孩子节点的指针

// 而 TrieMap 中的树节点 TrieNode 的代码实现是这样：
/* Trie 树节点实现 */
var TrieNode3 = function() {
    this.val = null;
    this.children = new Array(256);
};

// 这个 val 字段存储键对应的值，children 数组存储指向子节点的指针。

// 但是和之前的普通多叉树节点不同，TrieNode 中 children 数组的索引是有意义的，代表键中的一个字符。

// 比如说 children[97] 如果非空，说明这里存储了一个字符 'a'，因为 'a' 的 ASCII 码为 97。

// 我们的模板只考虑处理 ASCII 字符，所以 children 数组的大小设置为 256。不过这个可以根据具体问题修改，
// 比如改成更小的数组或者 HashMap<Character, TrieNode> 都是一样的效果。

// 这里要特别注意，TrieNode 节点本身只存储 val 字段，并没有一个字段来存储字符，字符是通过子节点在父节点的 children 数组中的索引确定的。

// 形象理解就是，Trie 树用「树枝」存储字符串（键），用「节点」存储字符串（键）对应的数据（值）。所以我在图中把字符标在树枝，键对应的值 val 标在节点上

// 现在你应该知道为啥 Trie 树也叫前缀树了，因为其中的字符串共享前缀，相同前缀的字符串集中在 Trie 树中的一个子树上，给字符串的处理带来很大的便利。