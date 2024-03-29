// 57. Insert Interval
// Medium
// Topics
// Companies
// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const res = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (Math.max(newInterval[0], start) <= Math.min(newInterval[1], end)) {
      newInterval = [
        Math.min(start, newInterval[0]),
        Math.max(end, newInterval[1]),
      ];
      continue;
    }
    if (start > newInterval[1]) {
      res.push(newInterval, ...intervals.slice(i));
      return res;
    }
    res.push(intervals[i]);
  }
  res.push(newInterval);
  return res;
};
