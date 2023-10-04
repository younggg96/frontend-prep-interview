// Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

// The following rules define a valid string:

// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "(*)"
// Output: true
// Example 3:

// Input: s = "(*))"
// Output: true

// 栈
// 括号匹配的问题可以用栈求解。

// 如果字符串中没有星号，则只需要一个栈存储左括号，在从左到右遍历字符串的过程中检查括号是否匹配。

// 在有星号的情况下，需要两个栈分别存储左括号和星号。从左到右遍历字符串，进行如下操作。

// 如果遇到左括号，则将当前下标存入左括号栈。

// 如果遇到星号，则将当前下标存入星号栈。

// 如果遇到右括号，则需要有一个左括号或星号和右括号匹配，由于星号也可以看成右括号或者空字符串，因此当前的右括号应优先和左括号匹配，没有左括号时和星号匹配：

// 如果左括号栈不为空，则从左括号栈弹出栈顶元素；

// 如果左括号栈为空且星号栈不为空，则从星号栈弹出栈顶元素；

// 如果左括号栈和星号栈都为空，则没有字符可以和当前的右括号匹配，返回 false\text{false}false。

// 遍历结束之后，左括号栈和星号栈可能还有元素。为了将每个左括号匹配，需要将星号看成右括号，且每个左括号必须出现在其匹配的星号之前。当两个栈都不为空时，每次从左括号栈和星号栈分别弹出栈顶元素，对应左括号下标和星号下标，判断是否可以匹配，匹配的条件是左括号下标小于星号下标，如果左括号下标大于星号下标则返回 false\text{false}false。

// 最终判断左括号栈是否为空。如果左括号栈为空，则左括号全部匹配完毕，剩下的星号都可以看成空字符串，此时 sss 是有效的括号字符串，返回 true\text{true}true。如果左括号栈不为空，则还有左括号无法匹配，此时 sss 不是有效的括号字符串，返回 false\text{false}false。


/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    const leftStack = [];
    const starStack = [];
    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(') {
            leftStack.push(i);
        }
        if(s[i] === "*") {
            starStack.push(i);
        }

        if(s[i] === ")") {
            if(leftStack.length) {
                leftStack.pop();
            } else if (starStack.length) {
                starStack.pop();
            } else {
                return false;
            }
        }
    }
    while(leftStack.length && starStack.length) {
        const leftIndex = leftStack.pop();
        const starIndex = starStack.pop();
        if(leftIndex > starIndex) {
            return false;
        }
    }
    return leftStack.length === 0;
};
