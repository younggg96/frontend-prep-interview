/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
    const arr = preorder.split(',');
    const stack = [];
    for (let i = 0; i < arr.length;) {
        if (arr[i] !== '#') {
            stack.push(arr[i]);
            i++;
        } else {
            if (stack[stack.length - 1] === '#') {
                stack.pop();
                if (stack.length === 0) return false;
                stack.pop();
            } else {
                stack.push('#');
                i++;
            }
        }
    }
    return stack.length === 1 && stack[0] === '#';
};