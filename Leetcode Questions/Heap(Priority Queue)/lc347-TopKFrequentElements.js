// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// k is in the range [1, the number of unique elements in the array].
// It is guaranteed that the answer is unique.

// Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 交换
  swap(i1, i2) {
    let temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  // 获取父节点位置
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  // 获取左子节点位置
  getLeftIndex(i) {
    return 2 * i + 1;
  }
  // 获取右子节点位置
  getRightIndex(i) {
    return 2 * i + 2;
  }
  // 上移
  upShift(index) {
    if (index == 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].value > this.heap[index].value
    ) {
      this.swap(index, parentIndex);
      this.upShift(parentIndex);
    }
  }
  // 下移
  downShift(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].value < this.heap[index].value
    ) {
      this.swap(leftIndex, index);
      this.downShift(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value < this.heap[index].value
    ) {
      this.swap(rightIndex, index);
      this.downShift(rightIndex);
    }
  }
  // 插入
  insert(value) {
    this.heap.push(value);
    this.upShift(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    this.heap[0] = this.heap.pop();
    this.downShift(0);
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆大小
  size() {
    return this.heap.length;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let n of nums) {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  }
  const heap = new MinHeap();
  map.forEach((value, key) => {
    heap.insert({ value, key });
    if (heap.size() > k) {
      heap.pop();
    }
  });
  return heap.heap.map((a) => a.key);
};
