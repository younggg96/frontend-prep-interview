# ✅ **Problem Summary**

You are given an array of integers. Determine whether there exist **four distinct elements**
`y, a, x, b` such that:

[
y = a \cdot x + b
]

Equivalently:

[
y - b = a \cdot x
]

---

# ✅ Optimal Idea (Key Insight)

Rewrite:

[
y - b = a \times x
]

This naturally splits into **two independent pairs**:

* Left side: `(y, b)` → `diff = y - b`
* Right side: `(a, x)` → `prod = a * x`

Thus the problem becomes:

> “Does any difference (y - b) match any product (a \times x)?”

This is exactly the same optimization used in **4Sum II**, reducing from O(n⁴) to O(n²).

---

# 🚀 **Optimal Solution: O(n²) Using Hashing**

1. Precompute **all pairwise products** `a * x`
2. Store them in a hash map (or set)
3. For each pair `(y, b)`, compute `y - b`
4. Check if that value exists in the map
5. Ensure all four indices are distinct

This gives:

* **Time:** O(n²)
* **Space:** O(n²)
* This is essentially **optimal** for a four-variable equation.

---

# 💻 JavaScript Solution (Interview-friendly Pseudocode)

```js
function existsYEqualsAXPlusB(nums) {
  const n = nums.length;
  const products = new Map(); // key: a*x, value: list of [aIndex, xIndex]

  // Step 1: cache all a * x
  for (let a = 0; a < n; a++) {
    for (let x = 0; x < n; x++) {
      if (a === x) continue;
      const val = nums[a] * nums[x];
      if (!products.has(val)) products.set(val, []);
      products.get(val).push([a, x]);
    }
  }

  // Step 2: check all y - b
  for (let y = 0; y < n; y++) {
    for (let b = 0; b < n; b++) {
      if (y === b) continue;
      const diff = nums[y] - nums[b];

      if (!products.has(diff)) continue;

      // ensure four distinct indices
      for (const [ai, xi] of products.get(diff)) {
        if (ai !== y && ai !== b && xi !== y && xi !== b) {
          return true; // valid quadruple found
        }
      }
    }
  }

  return false;
}
```

---

# 🎤 Final Interview Answer (English, polished)

Here is the version you can **speak aloud**:

> The equation is (y = a x + b).
> I rewrite it as (y - b = a \times x).
> My first thought was to try a 3Sum-style approach, but that doesn’t work because the expression is not monotonic due to the multiplication. Two pointers cannot determine which direction to move, so it cannot beat O(n³).
>
> The correct approach is to treat this as a four-variable constraint and use hashing to reduce the complexity.
> I precompute all pairwise products (a \times x) and store them in a hash map in O(n²) time. Then I iterate over all pairs ((y, b)), compute (y - b), and check if the value exists in the map. As long as the four indices are distinct, I’ve found a valid solution.
>
> This gives an O(n²) time and space algorithm, which is optimal for this type of equation because even enumerating all pairs is already Θ(n²).

