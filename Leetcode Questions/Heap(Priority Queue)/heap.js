// heap
// left node => 2 * index + 1
// right node => 2 * index + 2
// parent node => (index - 1) / 2

// find big/small node O(1)
// find kth node
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