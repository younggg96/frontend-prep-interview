# 链表 linkedList

技巧
1. 虚拟头结点（构建新链表时的常用技巧）
```
    let dummy = new ListNode(-1);
    // 指针 p 负责构建新链表
    let p = dummy;
```
2. 双指针法
```
  let l1 = list1;
  let l2 = list2;
```
3. 快慢指针
快指针走两步，慢指针走一步
找中点
```
mid node
var middleNode = function(head) {
    if(!head) return null;
    let fast = head;
    let slow = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow
};
```

4. 反转链表
```
var reverseList = function(head) {
    let cur = head, pre = null;
    while(cur) {
        const temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
};
```
5. 删除节点
