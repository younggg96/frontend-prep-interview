class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.map.get(key);
    if(node) {
        this._delete(node);
        this._addFront(node);
        return node.value;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const node = this.map.get(key);

    if(node) {
        node.value = value;
        this._delete(node);
        this._addFront(node);
        return;
    }

    const newNode = new Node(key, value);
    this.map.set(key, newNode);
    this._addFront(newNode);

    if(this.map.size > this.capacity) {
        const lru = this.tail.prev;
        this._delete(lru);
        this.map.delete(lru.key);
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

LRUCache.prototype._addFront = function (node) {
    const first = this.head.next;

    node.prev = this.head;
    node.next = first;

    this.head.next = node;
    first.prev = node;
}

LRUCache.prototype._delete = function (node) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;

    node.prev = null;
    node.next = null;
}