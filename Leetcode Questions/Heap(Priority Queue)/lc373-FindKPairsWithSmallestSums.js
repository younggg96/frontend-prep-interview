// You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

// Define a pair (u, v) which consists of one element from the first array and one element from the second array.

// Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

// Example 1:

// Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// Output: [[1,2],[1,4],[1,6]]
// Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
// Example 2:

// Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
// Output: [[1,1],[1,1]]
// Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
// Example 3:

// Input: nums1 = [1,2], nums2 = [3], k = 3
// Output: [[1,3],[2,3]]
// Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]

// Constraints:

// 1 <= nums1.length, nums2.length <= 105
// -109 <= nums1[i], nums2[i] <= 109
// nums1 and nums2 both are sorted in non-decreasing order.
// 1 <= k <= 104

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
class MyPriorityQueue {
  // 创建优先队列的构造函数，参数是一个比较函数 comparator
  constructor(comparator) {
    this.heap = []; // 用于存储堆的数组
    this.comparator = comparator; // 存储比较函数
  }

  // 向优先队列中添加元素
  enqueue(val) {
    this.heap.push(val); // 将元素添加到数组末尾
    this.bubbleUp(); // 调整堆，以维护最小堆的性质
  }

  // 从优先队列中取出最小的元素
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0]; // 取出堆顶元素
    this.heap[0] = this.heap.pop(); // 将数组末尾的元素移动到堆顶
    this.sinkDown(0); // 调整堆，以维护最小堆的性质
    return root; // 返回堆顶元素
  }

  // 检查优先队列是否为空
  isEmpty() {
    return this.heap.length === 0;
  }

  // 上浮操作，用于维护最小堆性质
  bubbleUp() {
    let index = this.heap.length - 1; // 获取新添加元素的索引
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // 计算父节点的索引
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        // 如果新元素比父节点小，交换它们的位置
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex; // 更新索引，继续向上比较
      } else {
        break; // 如果新元素不再比父节点小，退出循环
      }
    }
  }

  // 下沉操作，用于维护最小堆性质
  sinkDown(index) {
    const leftChildIndex = 2 * index + 1; // 左子节点索引
    const rightChildIndex = 2 * index + 2; // 右子节点索引
    let smallest = index; // 当前节点索引

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
      // 如果最小元素不是当前节点，交换它们的位置
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.sinkDown(smallest); // 递归调用下沉操作
    }
  }
}

var kSmallestPairs = function (nums1, nums2, k) {
  const n = nums1.length; // 获取数组 nums1 的长度
  const m = nums2.length; // 获取数组 nums2 的长度
  const ans = []; // 用于存储结果的数组
  const pq = new MyPriorityQueue((a, b) => a[0] - b[0]); // 创建一个最小堆的优先队列

  // 将第一个数对 (nums1[0] + nums2[0], 0, 0) 放入优先队列
  pq.enqueue([nums1[0] + nums2[0], 0, 0]);

  // 当优先队列不为空且结果数组长度小于 k 时，继续执行
  while (!pq.isEmpty() && ans.length < k) {
    const p = pq.dequeue(); // 取出优先队列中的最小元素
    const i = p[1]; // 获取当前数对的 nums1 的索引
    const j = p[2]; // 获取当前数对的 nums2 的索引

    ans.push([nums1[i], nums2[j]]); // 将当前数对添加到结果数组

    // 如果 nums2 还有下一个元素，并且当前数对来自 nums1 的第一个元素
    if (j === 0 && i + 1 < n) {
      // 计算下一个数对的和 (nums1[i + 1] + nums2[0])，并将其加入优先队列
      pq.enqueue([nums1[i + 1] + nums2[0], i + 1, 0]);
    }

    // 如果 nums2 还有下一个元素
    if (j + 1 < m) {
      // 计算下一个数对的和 (nums1[i] + nums2[j + 1])，并将其加入优先队列
      pq.enqueue([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }

  return ans; // 返回结果数组
};
