// Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

// However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

// Return the least number of units of times that the CPU will take to finish all the given tasks.

// Example 1:

// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation:
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.
// Example 2:

// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
// ...
// And so on.
// Example 3:

// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation:
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

// Constraints:

// 1 <= task.length <= 104
// tasks[i] is upper-case English letter.
// The integer n is in the range [0, 100].
// Accepted
// 471K
// Submissions
// 820K
// Acceptance Rate
// 57.4%

// we count all the frequencies of each element and then send the element to the maxheap
// we will use the element frequency as the weight for maxHeap.
// after we enqueue all the element in the maxHeap, we can then start popping the element from the heap.
// we know as we dequeue elements, the element with maximum frequencies come out.
// we then start processing the each set of task,
// set of task-> means from the first time we perform one task, until the next time we can perform the same task again
// we will make sure to pull task from heap, as long as heap is not empty, sometimes heap will be empty as there might not be any tasks left while we are doing K+1 iteration. If the heap is empty while performing the iteration, we can think of that as, we are waiting(idle) task.
// as long as heap is not empty and us pulling the task from heap is basically performing the task, so we can keep count of that operation by updating count to be +1
// we reduce the frequency of the task and send it to the queue so the task can wait for next K+1 interval.
// after the K+1 interval, it is time for the tasks that are in the queue to be performed again
// we dequeue the queue and send it back to the heap (if their frequency is greater than 0)
// we will update our set of task counter(ans) variable after each cycle
// so we update our operations counter on two case:
// case 1: if the max Heap is empty, that means, there will be no next set of task we will perform and whatever we task operation we performed, we can add that to our answer
// case 2: if the max Heap is not empty, that means the next task we will perform next sets of task and the prior set of task we performed was K+1 itself. even if we may not have tasks that are K+1, we know we need to account for idle time.

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  let maxHeap = new MaxPriorityQueue();
  let map = new Map();
  let queue = new Array();
  let ans = 0;

  for (let i = 0; i < tasks.length; i++) {
      if (map.has(tasks[i])) {
          map.set(tasks[i], map.get(tasks[i]) + 1);
      } else {
          map.set(tasks[i], 1);
      }
  }
  for (let item of map) {
      maxHeap.enqueue(item[0], item[1]);
  }

  while (!maxHeap.isEmpty()) {
      let taskOperationCount = 0;
      for (let i = 0; i < n + 1; i++) {
          if (!maxHeap.isEmpty()) {
              let item = maxHeap.dequeue().element;
              map.set(item, map.get(item) - 1);
              queue.push(item);
              taskOperationCount++;
          }

      }
      while (queue.length > 0) {
          let item = queue.shift();
          if (map.get(item) > 0) {
              maxHeap.enqueue(item, map.get(item));
          }
      }

      if (!maxHeap.isEmpty()) {
          ans = ans + n + 1;
      } else {
          ans = ans + taskOperationCount;
      }
  }
  return ans;
};
