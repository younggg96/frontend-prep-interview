/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let dummy1 = new ListNode(-1);
    let dummy2 = new ListNode(-1);
    let p1 = dummy1;
    let p2 = dummy2;
    let p = head;
    while(p) {
        if(p.val >= x) {
            p2.next = p;
            p2 = p2.next
        } else {
            p1.next = p;
            p1 = p1.next
        }
        // 如果我们需要把原链表的节点接到新链表上，而不是 new 新节点来组成新链表的话，那么断开节点和原链表之间的链接可能是必要的。
        // 那其实我们可以养成一个好习惯，但凡遇到这种情况，就把原链表的节点断开，这样就不会出错了。

        const temp = p.next;
        p.next = null;
        p = temp;
    }
    p1.next = dummy2.next;
    return dummy1.next
};