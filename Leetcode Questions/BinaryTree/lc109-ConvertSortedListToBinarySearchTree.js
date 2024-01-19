/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    if(!head) return null;
    if (head.next == null) {
        return new TreeNode(head.val);
    }
    const helper = (head) => {
        if(!head) return null;
        let slow = head, fast = head, prev = head;
        while(fast && fast.next) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null;
        return slow;
    }

    const mid = helper(head);
    const res = new TreeNode(mid.val);
    res.left = sortedListToBST(head);
    res.right = sortedListToBST(mid.next);
    return res;
};