// You are given a sorted integer array arr containing 1 and prime numbers, where all the integers of arr are unique. You are also given an integer k.

// For every i and j where 0 <= i < j < arr.length, we consider the fraction arr[i] / arr[j].

// Return the kth smallest fraction considered. Return your answer as an array of integers of size 2, where answer[0] == arr[i] and answer[1] == arr[j].

// Example 1:

// Input: arr = [1,2,3,5], k = 3
// Output: [2,5]
// Explanation: The fractions to be considered in sorted order are:
// 1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
// The third fraction is 2/5.
// Example 2:

// Input: arr = [1,7], k = 1
// Output: [1,7]

// Constraints:

// 2 <= arr.length <= 1000
// 1 <= arr[i] <= 3 * 104
// arr[0] == 1
// arr[i] is a prime number for i > 0.
// All the numbers of arr are unique and sorted in strictly increasing order.
// 1 <= k <= arr.length * (arr.length - 1) / 2

// Follow up: Can you solve the problem with better than O(n2) complexity?

class MyPriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    // 找到当前节点、左子节点和右子节点中最小的元素的索引
    if (
      leftChildIndex < this.heap.length &&
      this.comparator(this.heap[leftChildIndex], this.heap[smallest]) < 0
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.comparator(this.heap[rightChildIndex], this.heap[smallest]) < 0
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.sinkDown(smallest);
    }
  }
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const pq = new MyPriorityQueue((a, b) => {
    return a[0] * b[1] - a[1] * b[0];
  });
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pq.enqueue([arr[i], arr[j]]);
    }
  }
  for (let i = 0; i < k - 1; i++) {
    pq.dequeue();
  }
  return pq.heap[0];
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction1 = function (arr, k) {
  const pq = new MyPriorityQueue((a, b) => {
    return a[0] * b[1] - a[1] * b[0];
  });
  let i = 0;
  let j = arr.length - 1;
  let res = [-1, -1];
  while (i < j) {
    pq.enqueue([arr[i], arr[j], j]);
    i++;
  }
  while (k-- > 0 && !pq.isEmpty()) {
    const cur = pq.dequeue();
    if (k == 0) {
      res[0] = cur[0];
      res[1] = cur[1];
    }
    if (cur[2] === 0) continue;
    pq.enqueue([cur[0], arr[cur[2] - 1], cur[2] - 1]);
  }
  return res;
};
