// 287. Find the Duplicate Number
// Solved
// Medium
// Topics
// Companies
// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

// There is only one repeated number in nums, return this repeated number.

// You must solve the problem without modifying the array nums and uses only constant extra space.

 

// Example 1:

// Input: nums = [1,3,4,2,2]
// Output: 2
// Example 2:

// Input: nums = [3,1,3,4,2]
// Output: 3
 

// Constraints:

// 1 <= n <= 105
// nums.length == n + 1
// 1 <= nums[i] <= n
// All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

// Follow up:

// How can we prove that at least one duplicate number must exist in nums?
// Can you solve the problem in linear runtime complexity?

// 预备知识

// 本方法需要读者对 「Floyd 判圈算法」（又称龟兔赛跑算法）有所了解，它是一个检测链表是否有环的算法，
// LeetCode 中相关例题有 141. 环形链表，142. 环形链表 II。

// 思路和算法

// 我们对 nums\textit{nums}nums 数组建图，每个位置 iii 连一条 i→nums[i]i\rightarrow \textit{nums}[i]i→nums[i] 的边。
// 由于存在的重复的数字 target\textit{target}target，因此 target\textit{target}target 这个位置一定有起码两条指向它的边，因此整张图一定存在环，且我们要找到的 target\textit{target}target 就是这个环的入口，那么整个问题就等价于 142. 环形链表 II。

// 我们先设置慢指针 slow\textit{slow}slow 和快指针 fast\textit{fast}fast ，慢指针每次走一步，快指针每次走两步，
// 根据「Floyd 判圈算法」两个指针在有环的情况下一定会相遇，此时我们再将 slow\textit{slow}slow 放置起点 000，两个指针每次同时移动一步，相遇的点就是答案。


// 这里简单解释为什么后面将 slow\textit{slow}slow 放置起点后移动相遇的点就一定是答案了。假设环长为 LLL，从起点到环的入口的步数是 aaa，从环的入口继续走 bbb 步到达相遇位置，从相遇位置继续走 ccc 步回到环的入口，则有 b+c=Lb+c=Lb+c=L，其中 LLL、aaa、bbb、ccc 都是正整数。根据上述定义，慢指针走了 a+ba+ba+b 步，快指针走了 2(a+b)2(a+b)2(a+b) 步。从另一个角度考虑，在相遇位置，快指针比慢指针多走了若干圈，因此快指针走的步数还可以表示成 a+b+kLa+b+kLa+b+kL，其中 kkk 表示快指针在环上走的圈数。联立等式，可以得到

// 2(a+b)=a+b+kL
// 解得 a=kL−b，整理可得

// a=(k-1)L+(L-b)=(k-1)L+c

// 从上述等式可知，如果慢指针从起点出发，快指针从相遇位置出发，每次两个指针都移动一步，则慢指针走了 aaa 步之后到达环的入口，快指针在环里走了 k−1k-1k−1 圈之后又走了 ccc 步，由于从相遇位置继续走 ccc 步即可回到环的入口，因此快指针也到达环的入口。两个指针在环的入口相遇，相遇点就是答案。


/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let slow = nums[0]; fast = nums[nums[0]];
    while(true) {
        slow = nums[slow];
        fast = nums[nums[fast]];
        if(slow == fast) break;
    }
    slow = 0;
    while(slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return fast;
    
};