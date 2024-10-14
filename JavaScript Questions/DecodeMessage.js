// Your are given a 2-D array of characters. There is a hidden message in it.

// I B C A L K A
// D R F C A E A
// G H O E L A D
// The way to collect the message is as follows

// start at top left
// move diagonally down right
// when cannot move any more, try to switch to diagonally up right
// when cannot move any more, try switch to diagonally down right, repeat 3
// stop when cannot neither move down right or up right. the character on the path is the message
// for the input above, IROCLED should be returned.

// notes

// if no characters could be collected, return empty string
/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  if (!message.length || !message[0].length) return "";

  let row = 0,
    col = 0;
  const res = [];
  let direction = "down"; // 初始方向为下右对角

  while (col < message[0].length) {
    res.push(message[row][col]);

    if (direction === "down") {
      if (row < message.length - 1 && col < message[0].length - 1) {
        row++;
        col++;
      } else {
        direction = "up";
        row--;
        col++;
      }
    } else if (direction === "up") {
      if (row > 0 && col + 1 < message[0].length) {
        row--;
        col++;
      } else {
        direction = "down";
        row++;
        col++;
      }
    }

    if (
      (direction === "down" &&
        row > message.length - 1 &&
        col > message[0].length - 1) ||
      (direction === "up" && row < 0 && col > message[0].length - 1)
    ) {
      break;
    }
  }

  return res.join("");
}


// 代码逻辑说明
// 循环遍历：在数组的列数范围内迭代（while (col < message[0].length)），确保列位置一直在范围内。
// 方向控制：
// 如果当前方向是 "down"，在能移动的情况下向右下移动。否则，切换到 "up"，并将行位置调整为 row - 1（如果在边界内）。
// 如果当前方向是 "up"，在能移动的情况下向右上移动。否则，切换到 "down"，并将行位置调整为 row + 1（如果在边界内）。
// 边界调整：在方向切换时，对行位置进行调整，确保行位置保持在有效范围之内。