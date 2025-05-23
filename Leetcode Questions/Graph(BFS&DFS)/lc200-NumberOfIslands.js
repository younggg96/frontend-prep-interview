// 200. Number of Islands
// Medium
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
// You may assume all four edges of the grid are all surrounded by water.

// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1

// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] is '0' or '1'.

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function dfs(row, col) {
        // Check boundaries and if current cell is land
        if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        // Mark current cell as visited
        grid[row][col] = '0';
        
        // Explore neighbors (up, right, down, left)
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row + 1, col);
        dfs(row, col - 1);
    }
    
    // Traverse the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j); // Mark all connected land as visited
            }
        }
    }
    
    return count;
};