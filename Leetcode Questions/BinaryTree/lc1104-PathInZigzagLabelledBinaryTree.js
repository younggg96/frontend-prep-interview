/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
    const getParent = (index, level) => {
        const parentIndex = Math.pow(2, level - 1) - 1 + Math.floor(index / 2) * -1;
        const parent = Math.pow(2, level - 1) + parentIndex;
        return { parent, parentIndex };
    }
    const getLevel = (label) => {
        let level = 0;
        let num = 0;
        while (true) {
            num += Math.pow(2, level);
            if (num >= label) {
                return level;
            }
            level++;
        }
        return level;
    }
    const res = [label];
    let level = getLevel(label);
    let curIndex = label - Math.pow(2, level);
    let parent = 0;

    while(level >= 1) {
        const result = getParent(curIndex, level);
        parent = result.parent;
        curIndex = result.parentIndex;
        res.unshift(parent);
        level--;
    }

    return res;
}; 