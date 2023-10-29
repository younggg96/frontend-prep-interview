/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let p1 = headA, p2 = headB;
    while(p1 != p2) {
        if(p1) {
            p1 = p1.next;
        } else {
            p1 = headB;
        }
        if(p2) {
            p2 = p2.next;
        } else {
            p2 = headA;
        }
    }
    return p1;
};