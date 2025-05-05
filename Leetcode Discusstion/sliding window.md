# 🧠 什么是滑动窗口（Sliding Window）？

在一维数据结构（数组或字符串）上，维护一个**“可伸缩的连续区间”**来动态满足题目的某个条件。

- 用两个指针（`left` 和 `right`）定义一个窗口
- 让 `right` 扩张窗口（加入元素）
- 当条件不满足时用 `left` 收缩窗口（剔除元素）

---

## 🔧 滑动窗口模板结构（动态窗口）

```javascript
let left = 0;
for (let right = 0; right < nums.length; right++) {
	// 加入 nums[right] 到窗口中

	while (窗口不满足条件) {
		// 缩小窗口，排除 nums[left]
		left++;
	}

	// 如果需要记录结果（最大长度、个数等）：
	result = max / min / update...
}
```

---

## 🎯 滑动窗口典型技巧总结

### 1. ✅ 固定窗口大小

**关键词**：最长平均值、滑窗和、最大频率、翻转固定次数  
- 你只需要维持窗口大小为 `k`  
- 每次滑动加一个、移除一个，更新答案即可  

**例题**：  
- 643. Maximum Average Subarray I  
- 1456. Max Number of Vowels in a Substring of Given Length  

---

### 2. ✅ 动态窗口大小

**关键词**：子数组和 ≥ k、包含某些字符、替换 k 个字符  
- 先不断扩大右边界  
- 一旦超过或满足条件，再收缩左边界  

**例题**：  
- 209. Minimum Size Subarray Sum  
- 1004. Max Consecutive Ones III  
- 76. Minimum Window Substring  

---

### 3. ✅ 无重复元素（集合去重）

**关键词**：最长无重复子串、滑窗 Set 去重  
- 用 `Set` 记录当前窗口元素，遇到重复就缩小窗口  
- 要求窗口内所有元素唯一  

**例题**：  
- 3. Longest Substring Without Repeating Characters  

---

### 4. ✅ 字符频率匹配（频率控制）

**关键词**：字母排列、最小覆盖子串、变形比较  
- 用两个 `Map` 或数组统计“目标频率”和“当前频率”  
- 窗口有效时才处理结果  

**例题**：  
- 567. Permutation in String  
- 438. Find All Anagrams in a String  
- 76. Minimum Window Substring  

---

### 5. ✅ 最多替换 / 容忍某类元素次数

**关键词**：最多翻转、最多替换、限制次数  
- 允许窗口内出现某些“坏值”最多 `k` 次  
- 窗口中统计某值的最大频率，与窗口大小比较控制收缩  

**例题**：  
- 424. Longest Repeating Character Replacement  
- 1004. Max Consecutive Ones III  

---

### 6. ✅ 复杂计数类：子数组个数

**关键词**：求子数组个数满足某条件（非长度），通常需配合 `HashMap`、前缀和优化  

**例题**：  
- 992. Subarrays with K Different Integers  
- 1248. Count Number of Nice Subarrays  

---

## 🪄 小技巧总结

| 技巧                  | 用途                                   |
|-----------------------|----------------------------------------|
| `Set.has()`           | 快速去重                               |
| `Map` 或 `Object`     | 控制频率                               |
| `right - left + 1`    | 窗口长度                               |
| `if (count > k) left++` | 控制翻转/替换类条件                   |
| `map.delete(nums[left])` | 缩小窗口并维护状态                   |

---

## 🎯 快速题型辨识口诀

| 题型           | 判断关键词               | 用什么结构                     |
|----------------|--------------------------|--------------------------------|
| 固定长度最大值 | “固定 k 长度子串”        | 固定窗口 + 滑动和              |
| 最短满足条件   | “最短长度/最小窗口”      | 动态窗口 + 条件收缩            |
| 无重复字符     | “不重复的最长子串”       | `Set` 去重                     |
| 字母频率匹配   | “排列/覆盖/异位词”       | 频率 `Map`/数组                |
| 允许变换/翻转  | “最多替换 k 次”          | 滑动 + 最大频率控制            |

---

## ✅ 想法变成代码的套路

1. 找子串/子数组：考虑滑动窗口（连续结构）  
2. 固定长度：固定窗口（加一个删一个）  
3. 最长/最短问题：窗口左右收缩，看是否满足条件  
4. 去重：用 `Set`  
5. 匹配：用 `Map` 或数组做频率表  

---

## ✅ 滑动窗口专题练习清单（按难度 & 技巧分类）

### 🔰 基础：子串/子数组长度类问题

| 题号 | 题目名                                   | 技巧关键词                     |
|------|------------------------------------------|--------------------------------|
| 3    | Longest Substring Without Repeating Characters | ✅ 无重复子串                  |
| 219  | Contains Duplicate II                   | 窗口查重，固定长度             |
| 643  | Maximum Average Subarray I              | 固定窗口和                     |
| 209  | Minimum Size Subarray Sum               | 动态窗口长度                   |
| 1456 | Max Vowels in a Substring of Given Length | 固定窗口内计数，判断字符类型（元音） |
| 1004 | Max Consecutive Ones III                | 滑动窗口 + 条件容忍，最多翻转 K 次 0 |
| 485  | Max Consecutive Ones                    | 无 K 限制版，纯粹滑窗扩展统计  |

---

### 🧠 中级：字符频率匹配 / 条件窗口

| 题号 | 题目名                                   | 技巧关键词                     |
|------|------------------------------------------|--------------------------------|
| 76   | Minimum Window Substring                | 最小窗口覆盖目标               |
| 567  | Permutation in String                   | 是否存在某排列                 |
| 438  | Find All Anagrams in a String           | 找所有异位词                   |
| 424  | Longest Repeating Character Replacement | 最多替换 k 个字符              |

---

### 🔄 进阶：窗口内统计 / 最大频率 / 条件满足个数

| 题号 | 题目名                                   | 技巧关键词                     |
|------|------------------------------------------|--------------------------------|
| 1004 | Max Consecutive Ones III                | 允许翻转 k 个 0               |
| 1456 | Max Vowels in Substring of Length k     | 固定窗口内元音数               |
| 2958 | Length of Longest Subarray With at Most K Frequency | 频率控制 + 滑窗               |

---

### 🔥 挑战：复杂统计与变形滑窗

| 题号 | 题目名                                   | 技巧关键词                     |
|------|------------------------------------------|--------------------------------|
| 992  | Subarrays with K Different Integers     | 子数组个数统计                 |
| 340  | Longest Substring with At Most K Distinct Characters | 限制不同字符个数             |
| 159  | Longest Substring with At Most Two Distinct Characters | 特殊场景的窗口收缩           |
| 239  | Sliding Window Maximum                 | 单调队列 + 滑窗               |

---

## 📈 推荐刷题顺序（学习路径）

`3 → 219 → 643 → 209 → 567 → 438 → 1004 → 76 → 424 → 1456 → 2958 → 992 → 340 → 239`

---

## ✅ 想法迁移建议

| 当前题学到的       | 迁移到的题目                     |
|--------------------|----------------------------------|
| 无重复字符         | 3, 159, 340                     |
| 固定窗口统计       | 643, 1456                       |
| 频率匹配           | 567, 438, 76                    |
| 条件约束           | 1004, 424, 2958                 |
