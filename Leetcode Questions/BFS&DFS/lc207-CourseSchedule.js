// 207. Course Schedule
// Solved
// Medium
// Topics
// Companies
// Hint
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

 

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

// Constraints:

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// All the pairs prerequisites[i] are unifuque.
// Accepted
// 1.4M
// Submissions
// 2.9M
// Acceptance Rate
// 46.2%

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    // 初始化邻接表和入度表
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = Array(numCourses).fill(0);

    // 构建图和记录每个节点的入度
    for (const [dest, src] of prerequisites) {
        graph[src].push(dest);
        inDegree[dest]++;
    }

    // 将所有入度为 0 的节点加入队列
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let visited = 0;  // 记录已访问节点数

    while (queue.length > 0) {
        const course = queue.shift();
        visited++;

        // 遍历当前课程的邻接节点
        for (const neighbor of graph[course]) {
            inDegree[neighbor]--;  // 入度减 1
            if (inDegree[neighbor] === 0) {  // 如果入度为 0，加入队列
                queue.push(neighbor);
            }
        }
    }

    // 如果所有节点都被访问过，则无环
    return visited === numCourses;
}
