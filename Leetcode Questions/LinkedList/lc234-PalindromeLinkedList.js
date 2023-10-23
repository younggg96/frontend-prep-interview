
// Code

// Testcase
// Testcase
// Result

// 234. Palindrome Linked List
// Solved
// Easy
// Topics
// Companies
// Given the head of a singly linked list, return true if it is a 
// palindrome
//  or false otherwise.

// Example 1:

// Input: head = [1,2,2,1]
// Output: true
// Example 2:

// Input: head = [1,2]
// Output: false
 

// Constraints:
// The number of nodes in the list is in the range [1, 105].
// 0 <= Node.val <= 9
 

// Follow up: Could you do it in O(n) time and O(1) space?
// Accepted
// 1.6M
// Submissions
// 3.2M
// Acceptance Rate
// 51.1%

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if(!head) return false;
    const stack = [];
    let l1 = head, l2 = head, cur = head;
    while(l2.next && l2.next.next) {
        l1 = l1.next;
        l2 = l2.next.next;
    }
    while(l1.next) {
        stack.push(l1);
    }
    while(stack.length) {
        const node = stack.pop();
        if(cur.val !== node.val) {
            return false;
        }
        cur = cur.next;
    }
    return true;
};