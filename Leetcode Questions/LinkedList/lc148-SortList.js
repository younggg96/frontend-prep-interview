// 148. Sort List
// Solved
// Medium
// Topics
// Companies
// Given the head of a linked list, return the list after sorting it in ascending order.

 

// Example 1:


// Input: head = [4,2,1,3]
// Output: [1,2,3,4]
// Example 2:


// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]
// Example 3:

// Input: head = []
// Output: []
 

// Constraints:

// The number of nodes in the list is in the range [0, 5 * 104].
// -105 <= Node.val <= 105
 

// Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

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
var sortList = function (head) {
    let slow = head, fast = head, prev = null;
    if (!head || !head.next) return head;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null;
    const mergeList = (l1, l2) => {
        let p = l1, q = l2;
        const res = new ListNode(-1);
        let r = res;
        while (p && q) {
            if (p.val > q.val) {
                r.next = q;
                q = q.next;
            } else {
                r.next = p;
                p = p.next;
            }
            r = r.next;
        }
        if (p) {
            r.next = p;
        }
        if (q) {
            r.next = q;
        }
        return res.next;
    }

    const l1 = sortList(slow);
    const l2 = sortList(head);
    return mergeList(l1, l2);
};