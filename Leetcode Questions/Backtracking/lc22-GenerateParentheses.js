// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n === 0) return [];
  const res = [];
  let track = "";

  const backtrack = (l, r, track, res) => {
    if (r > l) return;
    if (r < 0 || l < 0) return;

    if (l === 0 && r === 0) {
      res.push(track);
      return;
    }

    track = track + '(';
    backtrack(l - 1, r, track, res);
    track = track.slice(0, -1);

    track = track + ')';
    backtrack(l, r - 1, track, res);
    track = track.slice(0, -1);

  };

  backtrack(n, n, track, res);
  return res;
};
