// heap
// left node => 2 * index + 1
// right node => 2 * index + 2
// parent node => (index - 1) / 2

// find big/small node O(1)
// find kth node

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // swap i1 i2
    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    getParentIndex(i) {
        if (i === 0) return undefined;
        return (i - 1) >> 1;
    }

    getLeftIndex(i) {
        return 2 * i + 1;
    }

    getRightIndex(i) {
        return 2 * i + 2;
    }

    upShift(index) {
        if (index == 0) return;
        const parentIndex = this.getParentIndex(index);
        if (index != 0 && this.heap[parentIndex] > this.heap[index]) {
            this.swap(index, parentIndex);
            this.upShift(parentIndex)
        }
    }

    downShift(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if (leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.downShift(leftIndex);
        }
        if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.downShift(rightIndex);
        }
    }

    insert(value) {
        this.heap.push(value);
        this.upShift(this.heap.length - 1);
    }

    pop() {
        this.heap[0] = this.heap.pop();
        this.downShift(0)
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}