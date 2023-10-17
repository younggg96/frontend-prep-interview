// 1857. Largest Color Value in a Directed Graph
// Solved
// Hard
// Topics
// Companies
// Hint
// There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.

// You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.

// A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.

// Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.

 

// Example 1:



// Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
// Output: 3
// Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).
// Example 2:



// Input: colors = "a", edges = [[0,0]]
// Output: -1
// Explanation: There is a cycle from 0 to 0.


// Constraints:

// n == colors.length
// m == edges.length
// 1 <= n <= 105
// 0 <= m <= 105
// colors consists of lowercase English letters.
// 0 <= aj, bj < n

/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */


// 状态1：出队个数 →用于环路判断
// 1 状态：出队的状态节点的个数
// 2 递推：每次出队加上即可
// 3 顺序：先序*访问 → BFS
// 状态2：最长路径
// 1 状态：dp[cur]代表DAG图上的起点到终点的全部路径
// a 边界状态：入度为0的点
// b 目标状态：搜索到哪里就是哪里 
// 2 递推：dp[cur] = Math.max(dp[cur],dp[pre] + (colors[cur]===color))
// 3 顺序：先序*邻接 → BFS

var largestPathValue = function(colors, edges) {
    const n = colors.length
    //1、建图
    const graph = new Array(n).fill(0).map(()=>new Array())
    const indeg = new Array(n).fill(0)
    for(let [x,y] of edges){
        graph[x].push(y)
        indeg[y]++
    }
    let queue = []
    //边界状态
    for(let i = 0; i < n; i++) if(indeg[i] === 0) queue.push(i)
    let res = 0
    for(let i = 0; i < 26; i++) {
        const ans = bfs(String.fromCharCode(97+i),graph,indeg.slice(),queue.slice(),colors)
        if(ans === -1) return -1 
        res = Math.max(res,ans)
    }
    return res 
};

function bfs(color,graph,indeg,queue,colors){ 
    const n = colors.length
    const dp = new Array(n).fill(0)
    for(let x of queue) if(colors[x] === color) dp[x] = 1  //边界状态
    let size = 0
    while(queue.length){
        const next = []
        size += queue.length 
        for(let x of queue){
            for(let y of graph[x]){
                if(--indeg[y] === 0) next.push(y) 
                //递推公式
                dp[y] = Math.max(dp[y],dp[x] + (colors[y]===color))
            }
        }
        queue = next 
    }
    if(size !== n) return -1 //代表有环路
    return Math.max(...dp)
}