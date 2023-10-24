// 1, 2, 3, 4, 5  [2, 4]

var reverseBetween = function (head, m, n) {
  let start = head,
    cur = head;
  let i = 1;
  while (i < m) {
    start = cur; // 记录 1 为start
    cur = cur.next; // 记录 2 为cur开始反转
    i++;
  }
  let prev = null,
    tail = cur;
  while (i <= n) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
    i++;
  }
  start.next = prev;
  tail.next = cur;
  return m == 1 ? prev : head;
  // if m == 1, we have no need to connect start list with reversed list reversed list itself is the start (or the head)
  // Time Complexity: O(n)
  // Space Complexity: O(1)
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === right) return head;
  let dummy = { next: head };
  let cur = dummy;
  for (let i = 0; i < left - 1; i++) {
    cur = cur.next;
  }
  let pre = cur;
  let start = cur;
  let tail = cur.next;
  cur = cur.next;
  for (let i = left - 1; i < right; i++) {
    const temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  start.next = pre;
  tail.next = cur;
  return dummy.next;
};
