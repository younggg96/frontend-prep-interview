## 🧩 Problem: Best Time to Buy and Sell Stock (LeetCode 121)

**Question:**
You are given an array `prices`, where `prices[i]` represents the stock price on day `i`.
Find the **maximum profit** you can achieve from one buy and one sell.
You must buy before you sell.

**Example:**

```js
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy at 1 and sell at 6 → profit = 5
```

---

## 💡 Intuition & Logic

We only need to **keep track of two things** while scanning the array:

1. The **lowest price so far** (`minPrice`)
2. The **maximum profit so far** (`maxProfit`)

For every day’s price:

* Update `minPrice` if we find a lower price.
* Calculate the profit if selling today: `price - minPrice`.
* Update `maxProfit` if that profit is greater.

We don’t need nested loops because we only care about the best *buy before sell* scenario.

---

## 🧠 Step-by-Step Example

| Day | Price | Min So Far | Profit (if sell today) | Max Profit |
| --- | ----- | ---------- | ---------------------- | ---------- |
| 1   | 7     | 7          | -                      | 0          |
| 2   | 1     | 1          | 0                      | 0          |
| 3   | 5     | 1          | 4                      | 4          |
| 4   | 3     | 1          | 2                      | 4          |
| 5   | 6     | 1          | 5                      | 5          |
| 6   | 4     | 1          | 3                      | 5          |

✅ **Final Answer = 5**

---

## ⚙️ Complexity

* **Time:** O(n) — single pass
* **Space:** O(1) — only two variables

---

## 💻 JavaScript Implementation

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}
```

---

## 🚀 Follow-up: Multi-threaded Optimization

### 🧠 Idea

In a distributed or multi-threaded system:

* Split `prices` into `k` segments.
* Each thread computes:

  * The **minimum** and **maximum** price in its segment.
  * The **max profit** achievable *within* its segment.
* Finally, merge results:

  * The global best profit is either:

    * within a segment, or
    * across segments (buy in an earlier segment, sell in a later one).

This is a **parallel prefix-suffix scan**, similar to how MapReduce works.

---

### 🧾 JS-style Pseudocode

```js
// Worker: compute stats for each segment
function computeSegment(prices, start, end) {
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let maxProfit = 0;
  let rollingMin = Infinity;

  for (let i = start; i < end; i++) {
    const p = prices[i];
    if (p < rollingMin) rollingMin = p;
    const profit = p - rollingMin;
    if (profit > maxProfit) maxProfit = profit;
    if (p < minPrice) minPrice = p;
    if (p > maxPrice) maxPrice = p;
  }

  return { minPrice, maxPrice, maxProfit };
}

// Main: parallel aggregation + merge
async function maxProfitParallel(prices, numWorkers = 4) {
  const n = prices.length;
  const chunk = Math.ceil(n / numWorkers);
  const tasks = [];

  // Step 1: split array into segments
  for (let i = 0; i < numWorkers; i++) {
    const start = i * chunk;
    const end = Math.min(n, start + chunk);
    if (start < end) tasks.push({ start, end });
  }

  // Step 2: parallel computation (simulated here)
  const results = await Promise.all(tasks.map(({ start, end }) =>
    Promise.resolve(computeSegment(prices, start, end))
  ));

  // Step 3: sequential merge
  let globalMin = Infinity;
  let answer = 0;

  for (const seg of results) {
    // Profit from cross-segment trades
    if (globalMin !== Infinity) {
      const crossProfit = seg.maxPrice - globalMin;
      if (crossProfit > answer) answer = crossProfit;
    }
    // Profit within this segment
    if (seg.maxProfit > answer) answer = seg.maxProfit;
    // Update min for next segment
    globalMin = Math.min(globalMin, seg.minPrice);
  }

  return answer;
}
```

---

### 🧩 Key Takeaways

* **Single-threaded:** O(n) scan with rolling min/max (optimal for normal input size).
* **Parallelized version:** Use segment-wise reduction for large datasets.
* **Concepts involved:**

  * Divide & conquer
  * Prefix/suffix merge
  * Map-reduce style computation
