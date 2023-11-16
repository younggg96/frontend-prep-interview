// There are n persons on a social media website. You are given an integer array ages where ages[i] is the age of the ith person.

// A Person x will not send a friend request to a person y (x != y) if any of the following conditions is true:

// age[y] <= 0.5 * age[x] + 7
// age[y] > age[x]
// age[y] > 100 && age[x] < 100
// Otherwise, x will send a friend request to y.

// Note that if x sends a request to y, y will not necessarily send a request to x. Also, a person will not send a friend request to themself.

// Return the total number of friend requests made.

 

// Example 1:

// Input: ages = [16,16]
// Output: 2
// Explanation: 2 people friend request each other.
// Example 2:

// Input: ages = [16,17,18]
// Output: 2
// Explanation: Friend requests are made 17 -> 16, 18 -> 17.
// Example 3:

// Input: ages = [20,30,100,110,120]
// Output: 3
// Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.

/**
 * @param {number[]} ages
 * @return {number}
 * 排序 + 双指针
 */
// 给定用户年龄列表ages，根据特定的条件来确定用户发送好友请求的情况。
// 条件包括：
// 如果年龄y满足0.5 * ages[x] + 7 < ages[y] ≤ ages[x]且ages[y] > ages[x]，用户x向用户y发送好友请求。
// 只有当ages[x] ≥ 15时才会考虑发送请求。
// 需要对ages数组进行排序，并使用双指针（left和right）来维护满足条件的年龄范围。
// 提取出来的问题涉及对给定用户年龄列表进行处理，根据一系列条件确定哪些用户能够发送好友请求。这个过程包括对年龄列表排序，并利用双指针技巧来确定符合条件的用户对。
var numFriendRequests = function(ages) {
    let len = ages.length;
    ages.sort((a, b) => a - b);
    let l = 0, r = 0, ans = 0;
    for(let age of ages) {
        if(age <= 14) continue;
        while(ages[l] <= 0.5 * age + 7) {
            ++l;
        }
        while(ages[r + 1] <= age && r + 1 < len) {
            ++r;
        }
        ans += r - l;
    }
    return ans;
};

// 计数排序 + 前缀和
var numFriendRequests = function(ages) {
    const cnt = new Array(121).fill(0);
    for (const age of ages) {
        ++cnt[age];
    }
    const pre = new Array(121).fill(0);
    for (let i = 1; i <= 120; ++i) {
        pre[i] = pre[i - 1] + cnt[i];
    }
    let ans = 0;
    for (let i = 15; i <= 120; ++i) {
        if (cnt[i] > 0) {
            const bound = Math.floor(i * 0.5 + 8);
            ans += cnt[i] * (pre[i] - pre[bound - 1] - 1);
        }
    }
    return ans;
};