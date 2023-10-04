// Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

// Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.

 

// Example 1:

// Input: s = "()())()"
// Output: ["(())()","()()()"]
// Example 2:

// Input: s = "(a)())()"
// Output: ["(a())()","(a)()()"]
// Example 3:

// Input: s = ")("
// Output: [""]
 

// Constraints:

// 1 <= s.length <= 25
// s consists of lowercase English letters and parentheses '(' and ')'.
// There will be at most 20 parentheses in s.

// 基本思路
// 这道题的难度等级是困难，不过你不要被吓住了，有 刷题心法 和 手把手刷二叉树（纲领篇） 两篇核心框架文章的思路指导，你就只需要思考如何穷举就行了。

// 什么？你说你没有穷举的思路？让我来手把手教你穷举。

// 首先，关键肯定是左右括号，s 中包含的英文字母都是迷魂弹，我们暂时直接忽略。

// 那么，对于一个左括号或者右括号，它们有什么可能？很简单，要么被保留，要么被删除，这样一来，我们不就可以穷举出所有可能的情况吗？

// 有了这个思路，我们就可以用 回溯算法核心套路框架 来解决这个问题了，直接看代码吧。

// 我给的这个解法应该可以通过力扣的判题系统，但显然效率不高。不过如果让你自己写这道题，你连这个算法都写不出来的话，我建议暂时不要沉迷于最优解了，先做到能够自己写出这个解法再谈进一步的优化。因为后面的优化都是基于这个最简单粗暴的解法延伸出来的。

// 那么，如何优化呢？其实很简单，有些括号是我们笃定不会删除的，你是有办法通过左右括号的数量来判断的。

// 比如说 s = "())??"，因为我们是用 i 从左到右遍历 s，所以 i 后面的字符处于未知状态，我就用 ? 表示了。

// 现在你的 i 遍历到了第二个右括号，你告诉我，这里你还需要犹豫吗？这个右括号肯定是要删除的，因为它前面必然没有左括号和它匹配，所以它肯定是多余的。

// 这就是优化的切入点，你可以学习一下 isValid 函数的做法，用变量记录左括号的数量，从而预判后面的括号是否多余。我就不写优化的解法了，也不难，留给你做作业吧，请动手尝试一下。

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    
};