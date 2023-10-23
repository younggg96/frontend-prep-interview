// 61. Rotate List
// Solved
// Medium
// Topics
// Companies
// Given the head of a linked list, rotate the list to the right by k places.

 

// Example 1:


// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]
// Example 2:


// Input: head = [0,1,2], k = 4
// Output: [2,0,1]
 

// Constraints:

// The number of nodes in the list is in the range [0, 500].
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var rotateRight = function(head, k) {
    if(!head) return head;
    let count = 0, cur = head;
    while(cur) {
        count++;
        cur = cur.next;
    }
    cur = head;
    let l1 = head, l2= head;
    k = k % count;
    while(k-- > 0) {
        l2 = l2.next;
    }

    while(l2.next) {
        l1 = l1.next;
        l2 = l2.next;
    }
    l2.next = head;
    head = l1.next;
    l1.next = null;

    return head;
}; 