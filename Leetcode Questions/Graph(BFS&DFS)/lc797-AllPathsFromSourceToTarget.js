// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const last = graph.length - 1;
    const res = [];
    const traverse = (cur, path) => {
        path.push(cur);
        if (cur === last) {
            res.push([...path]);
            path.pop();
            return;
        }
        for (let i = 0; i < graph[cur].length; i++) {
            traverse(graph[cur][i], path);
        }
        path.pop();
    }
    traverse(0, []);
    return res;
};