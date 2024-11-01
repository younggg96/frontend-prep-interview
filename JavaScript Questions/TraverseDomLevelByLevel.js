// Given a DOM tree, flatten it into an one dimensional array, in the order of layer by layer, like below.

// 综上所述，这个函数的 **时间复杂度为O(n)**，**空间复杂度为O(n)**。
/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {
  const result = [];
  if (!root) {
    return result;
  }
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }
  return result;
}
