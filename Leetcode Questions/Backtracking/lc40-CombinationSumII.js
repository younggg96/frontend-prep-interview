// Given a collection of candidate numbers (candidates) and a target number (target),
// find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Example 1:

// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]
// Example 2:

// Input: candidates = [2,5,2,1,2], target = 5
// Output:
// [
// [1,2,2],
// [5]
// ]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const res = [];
  if (!candidates.length) return res;
  const sortedArr = candidates.sort((a, b) => a - b);
  const backTrack = (track, list, sum, start) => {
    if (sum === target) {
      res.push([...track]);
      return;
    }
    if (sum > target) {
      return;
    }
    for (let i = start; i < list.length; i++) {
      if (i > start && list[i] === list[i - 1]) continue;
      track.push(list[i]);
      sum += list[i];
      backTrack(track, list, sum, i + 1);
      track.pop();
      sum -= list[i];
    }
  };
  backTrack([], candidates, 0, 0);
  return res;
};
