// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
// Example 2:

// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
// Example 3:

// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  //入度统计
  const indeg = new Array(n + 1).fill(2);
  indeg[0] = 0;
  indeg[1] = 0;

  //队列：队列中的状态点的值已经求出来了
  const begin = [0, 1];

  const dfs = (x) => {
    //目标
    if (x === n) return;

    //扩展
    const next = x === 0 ? [2] : [x + 1, x + 2]; //next代表x的邻接节点
    for (let y of next) {
      if (y > n) continue;
      dp[y] += dp[x]; //y已经接收到x传来的值了
      indeg[y]--; //y所依赖的点的个数-1
      if (indeg[y] === 0) dfs(y); //y不依赖于任何点，y的值求出来了，可以入队
    }
  };

  for (let x of begin) dfs(x);

  return dp[n];
};

var fib2 = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  //入度：先序遍历要统计入度，入度的意义代表该点依赖于多少个点，当一个状态点接收到一个点的值，那么入度-1
  const indeg = new Array(n + 1).fill(2);
  indeg[0] = 0;
  indeg[1] = 0;

  //队列：队列中的状态点的值已经求出来了
  const begin = [0, 1];
  const dfs = (x) => {
    const stack = [[x, 0]]; //运行时栈
    while (stack.length) {
      const [x, vis] = stack[stack.length - 1]; //vis用来标记访问过几个邻接节点

      //出栈条件：当邻接节点访问完毕的时候，可以出栈
      const case1 = x === 0 && vis === 1; //当x == 0时，需要访问的邻接节点的个数为1
      const case2 = x !== 0 && vis === 2; //当x != 0时，需要访问的邻接节点的个数为2

      //case1：扩展入栈 → 先序传值
      if (!case1 && !case2) {
        const next = x === 0 ? 2 : x + vis + 1;
        stack[stack.length - 1][1]++; //代表扩展节点 + 1
        if (next > n) continue; //next
        indeg[next]--;
        dp[next] += dp[x];
        if (indeg[next] === 0) stack.push([next, 0]);
      }

      //case2：结束出栈 → 后序传值 → 出栈后将该值传递给栈顶节点
      else stack.pop();
    }
  };
  for (let x of begin) dfs(x);
  return dp[n];
};
