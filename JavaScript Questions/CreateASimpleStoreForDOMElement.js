// We have Map in es6, so we could use any data as key, such as DOM element.

// const map = new Map()
// map.set(domNode, somedata)
// What if we need to support old JavaScript env like es5, how would you create your own Node Store as above?

// You are asked to implement a Node Store, which supports DOM element as key.

// class NodeStore {
//   set(node, value) {
//   }

//   get(node) {
//   }

//   has(node) {
//   }
// }
// note

// Map is disabled when judging your code, it is against the goal of practicing.

// You can create a simple general Map polyfill. Or since you are asked to support specially for DOM element, what is special about DOM element?

// What is the Time / Space cost of your solution?
class NodeStore {
  constructor() {
    // 我们用一个对象来存储所有的键值对
    this.store = {};
    // 创建一个唯一的键来存储在每个 DOM 节点上
    this.uniqueKey = Symbol("nodeStoreKey");
  }

  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    // 检查节点是否已有唯一标识符
    if (!node[this.uniqueKey]) {
      // 为节点添加唯一标识符
      node[this.uniqueKey] = Symbol("nodeKey");
    }
    // 使用节点的唯一标识符作为键，将值存储在 store 中
    this.store[node[this.uniqueKey]] = value;
  }

  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    // 检查节点是否具有唯一标识符并从 store 中获取值
    return node[this.uniqueKey] ? this.store[node[this.uniqueKey]] : undefined;
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    // 检查节点是否具有唯一标识符且该标识符是否存在于 store 中
    return (
      !!node[this.uniqueKey] && this.store.hasOwnProperty(node[this.uniqueKey])
    );
  }
}
