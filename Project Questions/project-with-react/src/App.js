import { useState } from "react";
// 生成一个有解的数独谜题
function generateSudoku() {
  const emptyGrid = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];
  return fillGrid(emptyGrid);
}

// 递归回溯填充数独谜题
function fillGrid(grid) {
  const findEmptyCell = (grid) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === "") {
          return [i, j];
        }
      }
    }
    return null;
  };

  const isValid = (num, row, col, grid) => {
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num || grid[row][i] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solve = () => {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(num.toString(), row, col, grid)) {
        grid[row][col] = num.toString();
        if (solve()) {
          return true;
        }
        grid[row][col] = "";
      }
    }

    return false;
  };

  // solve();
  return grid;
}

function SudokuGame() {
  const [sudoku, setSudoku] = useState(generateSudoku());
  const [message, setMessage] = useState("");

  const handleInputChange = (row, col, e) => {
    const value = e.target.value.replace(/[^1-9]/g, "");
    const newSudoku = sudoku.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? value : cell
      )
    );
    setSudoku(newSudoku);
  };

  const checkAnswer = () => {
    const isCorrect = sudoku.every((row, rowIndex) =>
      row.every((cell, colIndex) => {
        if (cell === "") {
          return false;
        }
        let isValid = sudoku[rowIndex].every(
          (c, i) => c !== cell || i === colIndex
        );
        isValid &= sudoku.every(
          (r, i) => r[colIndex] !== cell || i === rowIndex
        );
        isValid &= checkSubgrid(rowIndex, colIndex, cell);
        return isValid;
      })
    );
    setMessage(isCorrect ? "恭喜，答案正确！" : "答案有误，请检查！");
  };

  const checkSubgrid = (row, col, num) => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row && j !== col && sudoku[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div>
      <h1>数独游戏</h1>
      {sudoku.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((value, colIndex) => (
            <input
              key={colIndex}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
            />
          ))}
        </div>
      ))}
      <button onClick={checkAnswer}>检查答案</button>
      <p>{message}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SudokuGame />
    </div>
  );
}

export default App;
