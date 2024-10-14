// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

// Constraints:

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104

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
    if (this.heap[leftIndex] && this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.downShift(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[rightIndex] < this.heap[index]) {
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
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      heap.insert(nums[i]);
    } else {
      if (nums[i] >= heap.heap[0]) {
        heap.heap[0] = nums[i];
        heap.downShift(0);
      }
    }
  }
  return heap.heap[0];
};
