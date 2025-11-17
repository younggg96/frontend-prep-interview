## 1️⃣ 开头：先用嘴巴「整理题目」(10–20 秒)

> We have a 2D grid with walls, empty cells, a kid `K` and an ice cream truck `T`.
> Each minute, both can move one step up, down, left or right.
> I need to determine whether there is a cell where they can stand at the same time.


## 2️⃣ 先说一个 naive 想法，再自己否掉 (体现思考)

> A naive idea would be to try to simulate all possible moves of both the kid and the truck at the same time, but that explodes combinatorially because both can make choices at each step. That’s not scalable.

然后自然转到 BFS：

> Since every move has the same cost, this is really a shortest-path problem on a grid, which is a perfect fit for BFS.

---

## 3️⃣ 关键 insight：转换成「时间」问题

你要讲清楚这句：

> The key is that they move at the same speed.
> So if I know the **minimum time** it takes the kid to reach every cell, and the minimum time for the truck to reach every cell, then they can meet at a cell `(r, c)` if both can reach it and their arrival times are equal.

然后把解法讲出来：

> So I’ll:
>
> 1. Run BFS from the kid to compute `distKid[r][c]`.
> 2. Run BFS from the truck to compute `distTruck[r][c]`.
> 3. Scan all cells and check if there’s any cell where `distKid[r][c] === distTruck[r][c]` and both are reachable.

最后补一句复杂度：

> Each BFS is O(R * C), so the total time is O(R * C) and space is also O(R * C).

到这里，思路部分已经非常完整了。

---

## 4️⃣ 开始写代码：先写 BFS helper（边写边讲）

> I’ll start with a small helper to run BFS from a given starting position and return a distance matrix.

```js
function bfs(startR, startC, grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const INF = Infinity;

  const dist = Array.from({ length: rows }, () =>
    Array(cols).fill(INF)
  );

  const dist = Array(row).fill(Array(cols).fill(INF))

  const queue = [[startR, startC]];
  dist[startR][startC] = 0;

  const dirs = [
    [1, 0], [-1, 0],
    [0, 1], [0, -1],
  ];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        grid[nr][nc] !== '#' &&      // not a wall
        dist[nr][nc] === INF         // not visited yet
      ) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}
```

你可以一边写一边说类似：

> I use a standard BFS queue.
> `dist` is initialized to Infinity.
> When I first reach a cell, I set its distance to the parent distance + 1.

---

## 5️⃣ 主函数：找 K / T，然后调用 BFS，再比较

> Now I’ll implement the main function that finds the kid and the truck, runs BFS from both, and then checks if there’s a meeting cell.

```js
function canMeet(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let kid = null;
  let truck = null;

  // Find K and T
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 'K') kid = [r, c];
      if (grid[r][c] === 'T') truck = [r, c];
    }
  }

  const distK = bfs(kid[0], kid[1], grid);
  const distT = bfs(truck[0], truck[1], grid);

  // Check if there is a cell they can reach at the same time
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (distK[r][c] < Infinity && distT[r][c] < Infinity) {
        if (distK[r][c] === distT[r][c]) {
          return true;
        }

        // 如果题目说「truck 可以等你」，你可以改成：
        // if (distK[r][c] <= distT[r][c]) return true;
      }
    }
  }

  return false;
}
```

写完以后你可以总结一句：

> So the overall complexity is O(R * C) time and space, with two BFS passes and one scan.

---

## 6️⃣ 给你一个可以直接背的英文版本（完整讲解）

如果你要一口气从思路到复杂度说出来，可以用这个稿：

> I’ll treat the grid as an unweighted graph.
> The kid and the truck both move one cell per minute in four directions, so the natural tool is BFS.
>
> The key observation is that they move at the same speed.
> If I know the minimum time it takes the kid to reach every cell, and the minimum time for the truck to reach every cell, then they can meet at some cell if both can reach it and their arrival times are equal.
>
> Concretely, I’ll implement a BFS helper that, given a start position, returns a 2D distance array where `dist[r][c]` is the shortest time to reach that cell, or Infinity if it’s unreachable.
> I run this BFS once from `K` to get `distKid`, and once from `T` to get `distTruck`.
>
> Then I simply scan all cells.
> If there is any cell where `distKid[r][c]` and `distTruck[r][c]` are both finite and equal, I return true; otherwise I return false.
>
> Each BFS takes O(R * C) time, and the final scan is also O(R * C), so the total time complexity is O(R * C), and the space complexity is also O(R * C).

---

如果你愿意，下一步我可以帮你把：

* 股票题
* y = a·x + b
* nickname 分队
* 雪糕车

四道题都整理成「**同一种结构**：

> 问题复述 → naive → 核心 insight → 算法 → 复杂度 → JS 核心代码
> 这样你面试前只要刷一遍就能直接输出思考 + 代码。
