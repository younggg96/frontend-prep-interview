prefixSum + HashMap 的思想，你可以高效解决很多与“子数组/子串和/积/异或等满足某种条件”相关的题目。以下是一些经典的 LeetCode 题目（按类型分类），都可以用相似的方式解决：

⸻

🔢 一类：子数组和 == k 或满足某个值

题目 描述 难度 技巧 
560. Subarray Sum Equals K 子数组和恰好为 k 的个数 ⭐⭐ 中等 prefixSum + map 
525. Contiguous Array 0 和 1 数量相等的最长子数组 ⭐⭐ 中等 把 0 当作 -1 转换后变成“和为 0” 
1248. Count Number of Nice Subarrays 含恰好 k 个奇数的子数组个数 ⭐⭐ 中等 前缀和表示“奇数个数” 
930. Binary Subarrays With Sum 子数组中 1 的个数为 k 的总数 ⭐⭐ 中等 前缀和表示“1 的个数”

⸻

🔁 二类：子数组和是倍数、模 k、满足条件

题目 描述 难度 技巧 
523. Continuous Subarray Sum 是否存在子数组和是 k 的倍数 ⭐⭐ 中等 用 sum % k 存到 map 
974. Subarray Sums Divisible by K 子数组和能整除 k 的个数 ⭐⭐ 中等 前缀和对 k 取余，再用 map 计数

⸻

🧮 三类：前缀异或 xor（前缀位运算）

题目 描述 难度 技巧 
1310. XOR Queries of a Subarray 多个查询，求某段的异或值 ⭐ 简单 预处理 prefix XOR 
1442. Count Triplets That Can Form Two Arrays of Equal XOR 三元组满足异或条件 ⭐⭐ 中等 用前缀异或优化暴力

⸻

💡 四类：字符串中满足条件的子串（用前缀和优化）

题目 描述 技巧 
1177. Can Make Palindrome from Substring 区间内能否构成回文串 用前缀异或快速判断字符奇偶分布 
1915. Number of Wonderful Substrings 至多一个字符出现奇数次的子串数 用前缀位运算 + 状态压缩

⸻

📌 总结：什么时候可以考虑 prefixSum + HashMap？
• ❓ 题目要求：子数组/子串“和为某个值”、“满足某个余数”、“包含某种数量”
• ✅ 你可以将问题抽象为：是否存在某两点之间的连续段，其某种“累积属性的差”满足要求
• 💡 你能用 HashMap 记录过去见过的“状态/和/余数”，以快速查找

非常棒的问题！在前缀和 + 哈希表技巧中，什么时候用什么作为 key/value 很关键。我们来用通俗语言总结一下：

⸻

🧩 哈希表 Map 的设计思维

在这类问题中，Map（哈希表）用于记录：某个状态首次出现的位置、次数或对应值。
你需要根据题目目标选择合适的 key 和 value：

⸻

✅ 典型设计模式总结表

题目编号 问题目标 Map 的 key Map 的 value 用途说明
560 子数组和 == k 的个数 prefixSum 出现次数 count 用 sum - k 查找之前有没有合法起点
930 子数组和 == goal 的个数（01 数组） prefixSum 出现次数 count 同上，处理的是 0/1 形式
1248 子数组含恰好 k 个奇数 oddCount 出现次数 count oddCount - k 如果出现过，说明中间有恰好 k 个奇数
523 子数组和是 k 的倍数 prefixSum % k 第一次出现的 index 如果 mod 重复出现，说明中间一段和是 k 的倍数
525 0 和 1 数量相等的最长子数组 prefixSum（0 当-1） 第一次出现的 index 如果同一个和出现多次，中间那段和为 0，即 0 和 1 个数相等

⸻

🔁 决策套路：该选什么作为 key/value？

✅ 选 key：
• 你想快速查找的“状态” 是什么？
• 是 sum - k？用 prefixSum 作为 key（题 560/930/1248）
• 是 sum % k？用 mod 作为 key（题 523）
• 是 oddCount？也可以作为 key（题 1248）

✅ 选 value：
• 你想知道这个状态“在哪里”或“出现了几次”？
• 想统计有几段满足条件？value = 出现次数
• 想判断有没有前面某个位置能构成合法区间？value = 第一次出现的 index

⸻

🎯 快速判断方法：

想法 key 是什么？ value 是什么？
我要找从哪里开始可以形成目标子数组？ 状态值 index
我要数一共有几段满足条件？ 状态值 出现次数（count）

⸻

🧠 示例：以 523 为例
prefixSum % k == mod
我们想知道这个 mod 有没有出现过，并且当前 index 和它之间距离 ≥ 2：
map.set(mod, i); // key = mod，value = 第一次出现这个余数的索引
