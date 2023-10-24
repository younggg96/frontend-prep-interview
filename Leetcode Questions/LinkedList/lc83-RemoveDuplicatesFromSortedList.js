/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head == null) return null;
  let l1 = head,
    l2 = head;
  while (l2) {
    if (l1.val !== l2.val) {
      l1.next = l2;
      l1 = l1.next;
    }
    l2 = l2.next;
  }
  l1.next = null;
  return head;
};
