// Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B.

// By corresponding, we mean a and b have the same relative position to their DOM tree root.

// follow up

// This could be a problem on general Tree structure with only children.

// Could you solve it recursively and iteratively?

// Could you solve this problem with special DOM api for better performance?

// What are the time cost for each solution?

// 1. recursively
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }
  // your code here
  for (let i = 0; i < rootA.children.length; i++) {
    const res = findCorrespondingNode(
      rootA.children[i],
      rootB.children[i],
      target
    );
    if (res) {
      return res;
    }
  }
};

// 2.iteratively DFS
const findCorrespondingNode2 = (rootA, rootB, target) => {
  const stackA = [rootA],
    stackB = [rootB];
  while (stackA.length > 0) {
    const nodeA = stackA.pop();
    const nodeB = stackB.pop();

    if (nodeA === target) {
      return nodeB;
    }

    for (let i = 0; i < nodeA.children.length; i++) {
      stackA.push(nodeA.children[i]);
      stackB.push(nodeB.children[i]);
    }
  }
  return null;
};

// 3.
const findCorrespondingNodeDOMAPI = (rootA, rootB, target) => {
  if (!rootA.contains(target)) {
    return null;
  }

  let path = [];
  let node = target;

  // 找到 target 的位置（路径）
  while (node !== rootA) {
    const index = Array.prototype.indexOf.call(
      node.parentNode.childNodes,
      node
    );
    path.unshift(index);
    node = node.parentNode;
  }

  // 根据路径找到 rootB 的相应节点
  let result = rootB;
  for (let i = 0; i < path.length; i++) {
    result = result.childNodes[path[i]];
  }

  return result;
};
