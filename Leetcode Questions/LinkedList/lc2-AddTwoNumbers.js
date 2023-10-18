// 2. Add Two Numbers
// Solved
// Medium
// Topics
// Companies
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.


// Example 1:


// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // 在两条链表上的指针
    let p1 = l1, p2 = l2;
    // 虚拟头结点（构建新链表时的常用技巧）
    let dummy = new ListNode(-1);
    // 指针 p 负责构建新链表
    let p = dummy;
    // 记录进位
    let carry = 0;
    // 开始执行加法，两条链表走完且没有进位时才能结束循环
    while (p1 !== null || p2 !== null || carry > 0) {
        // 先加上上次的进位
        let val = carry;
        if (p1 !== null) {
            val += p1.val;
            p1 = p1.next;
        }
        if (p2 !== null) {
            val += p2.val;
            p2 = p2.next;
        }
        // 处理进位情况
        carry = Math.floor(val / 10);
        val = val % 10;
        // 构建新节点
        p.next = new ListNode(val);
        p = p.next;
    }
    // 返回结果链表的头结点（去除虚拟头结点）
    return dummy.next;
};


var addTwoNumbers = function (l1, l2) {
    let dump = new ListNode(-1);
    let i = l1;
    let j = l2;
    let res = dump;
    let carry = false;
    while (i && j) {
        let sum = 0;
        if (i) {
            sum += i.val;
            i = i.next;
        }
        if (j) {
            sum += j.val;
            j = j.next;
        }
        res.next = new ListNode((sum + (carry ? 1 : 0)) % 10);
        carry = Math.floor((sum + (carry ? 1 : 0)) / 10) === 1;
        res = res.next;
    }
    while (i) {
        let sum = i.val + (carry ? 1 : 0);
        res.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10) === 1;
        res = res.next;
        i = i.next;
    }
    while (j) {
        let sum = j.val + (carry ? 1 : 0);
        res.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10) === 1;
        res = res.next;
        j = j.next;
    }
    if (carry) {
        res.next = new ListNode(1, null);
    }
    return dump.next;
};