// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

// Example 1:

// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

// Constraints:

// 1 <= capacity <= 3000
// 0 <= key <= 104
// 0 <= value <= 105
// At most 2 * 105 calls will be made to get and put.

class Node {
  key;
  val;
  next;
  prev;
  constructor(k, v) {
    this.key = k;
    this.val = v;
    this.next = null;
    this.prev = null;
  }
}

class DoubleList {
  head = new Node(0, 0);
  tail = new Node(0, 0);
  size = 0;
  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addList(x) {
    x.prev = this.tail.prev;
    x.next = this.tail;
    this.tail.prev.next = x;
    this.tail.prev = x;
    this.size++;
  }

  remove(x) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
    this.size--;
  }

  removeFirst() {
    if (this.head.next == this.tail) return null;
    const first = this.head.next;
    this.remove(first);
    return first;
  }

  size() {
    return this.size;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.cache = new DoubleList();
  this.cap = capacity;

  this.makeRecently = (key) => {
    const x = this.map.get(key);
    this.cache.remove(x);
    this.cache.addList(x);
  };

  this.addRecently = (key, val) => {
    const x = new Node(key, val);
    this.cache.addList(x);
    this.map.set(key, x);
  };

  this.deleteKey = (key) => {
    const x = this.map.get(key);
    this.cache.remove(x);
    this.map.delete(key);
  };

  this.removeLeastRecently = () => {
    const deletedNode = this.cache.removeFirst();
    this.map.delete(deletedNode.key);
  };
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  this.makeRecently(key);
  return this.map.get(key).val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.deleteKey(key);
    this.addRecently(key, value);
    return;
  }
  if (this.cap === this.cache.size) {
    this.removeLeastRecently();
  }
  this.addRecently(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
