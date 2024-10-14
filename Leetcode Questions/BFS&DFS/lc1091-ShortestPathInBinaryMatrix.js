// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

// All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.

// Example 1:

// Input: grid = [[0,1],[1,0]]
// Output: 2

// Example 2:

// Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
// Output: 4
// Example 3:

// Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
// Output: -1

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  let m = grid.length,
    n = grid[0].length;
  if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1) return -1;
  let q = [];
  let visited = new Array(m).fill().map(() => new Array(n).fill(false));

  q.push([0, 0]);
  visited[0][0] = true;
  let pathLen = 1;

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  while (q.length > 0) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      let cur = q.shift();
      let x = cur[0],
        y = cur[1];
      if (x == m - 1 && y == n - 1) {
        return pathLen;
      }
      for (let j = 0; j < 8; j++) {
        let nextX = x + dirs[j][0];
        let nextY = y + dirs[j][1];
        if (
          nextX >= 0 &&
          nextX < m &&
          nextY >= 0 &&
          nextY < n &&
          grid[nextX][nextY] == 0 &&
          !visited[nextX][nextY]
        ) {
          q.push([nextX, nextY]);
          visited[nextX][nextY] = true;
        }
      }
    }
    pathLen++;
  }
  return -1;
};
