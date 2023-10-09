// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.

// The geometric information of each building is given in the array buildings where buildings[i] = [lefti, righti, heighti]:

// lefti is the x coordinate of the left edge of the ith building.
// righti is the x coordinate of the right edge of the ith building.
// heighti is the height of the ith building.
// You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

// The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form [[x1,y1],[x2,y2],...]. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate 0 and is used to mark the skyline's termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.

// Note: There must be no consecutive horizontal lines of equal height in the output skyline. For instance, [...,[2 3],[4 5],[7 5],[11 5],[12 7],...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...,[2 3],[4 5],[12 7],...]

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function (buildings) {
  const arr = [];
  for (let item of buildings) {
    arr.push([item[0], item[2]], [item[1], -item[2]]);
  }
  arr.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  const ret = [],
    priorityQueue = [0];
  const pushPQ = (h) => {
    if (h > priorityQueue[0]) {
      priorityQueue.unshift(h);
      return true;
    }
    for (let i = 0; i < priorityQueue.length; i++) {
      if (h > priorityQueue[i]) {
        const temp = priorityQueue.splice(i);
        priorityQueue.push(h, ...temp);
        break;
      }
    }
    return false;
  };

  const popPQ = (h) => {
    const index = priorityQueue.indexOf(h);
    priorityQueue.splice(index, 1);
    return index === 0 && priorityQueue[0] !== h;
  };

  for (let i of arr) {
    if (i[1] > 0) { // 左端点 入堆
      if (pushPQ(i[1])) ret.push([i[0], i[1]]) // 入堆 且是目前最大高度
    } else { // 右端点 出堆
      if (popPQ(-i[1])) ret.push([i[0], priorityQueue[0]]) // 出堆 且是唯一最大高度 压入第二高度
    }
  }
  return ret;
};

getSkyline([
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
]);
