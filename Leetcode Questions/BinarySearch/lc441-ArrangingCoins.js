/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    let level = 0;
    while(level <= n) {
        n -= level++;
    }
    return level - 1;
};