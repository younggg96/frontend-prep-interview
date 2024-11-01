import React from "react";
import "./styles.css";

export default function App() {
  const [board, setBoard] = React.useState(Array(3).fill(Array(3).fill("")));
  const [player, setPlayer] = React.useState("X");

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const check = (newBoard) => {
    const flatBoard = newBoard.flat();

    for (let [a, b, c] of win) {
      if (
        flatBoard[a] &&
        flatBoard[a] === flatBoard[b] &&
        flatBoard[a] === flatBoard[c]
      ) {
        return flatBoard[a];
      }
    }

    return null;
  };

  const onClickHandler = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.slice());

      if (newBoard[row][col] === "") {
        newBoard[row][col] = player;

        const winner = check(newBoard);
        if (winner) {
          alert(`${winner} wins!`);
        } else {
          // Switch player if no winner
          setPlayer(player === "X" ? "O" : "X");
        }
      }

      return newBoard;
    });
  };

  return (
    <div className="App">
      {player}
      {board.map((_, row) => {
        return (
          <div className="row" key={"row" + row}>
            {board[row].map((_, col) => {
              return (
                <div
                  className="item"
                  onClick={() => onClickHandler(row, col)}
                  key={"row" + row + "- col" + col}
                >
                  {board[row][col]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
