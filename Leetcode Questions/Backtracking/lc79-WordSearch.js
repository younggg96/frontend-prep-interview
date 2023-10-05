// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

// Constraints:
// m == board.length
// n = board[i].length
// 1 <= m, n <= 6
// 1 <= word.length <= 15
// board and word consists of only lowercase and uppercase English letters.

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (board == null || word == null || board.length == 0) return false;
  const backtrack = (board, row, col, word, index) => {
    if (index === word.length) return true;
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
      return false;
    }
    if (board[row][col] !== word[index]) return false;
    let temp = board[row][col];
    board[row][col] = "*";

    const res =
      backtrack(board, row, col + 1, word, index + 1) ||
      backtrack(board, row + 1, col, word, index + 1) ||
      backtrack(board, row - 1, col, word, index + 1) ||
      backtrack(board, row, col - 1, word, index + 1);

    board[row][col] = temp;
    return res;
  };

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (backtrack(board, row, col, word, 0)) {
        return true;
      }
    }
  }

  return false;
};
