/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    // 1. 将区间转化为事件点
    const events = [];
    for (const [start, end] of intervals) {
        // [时间, 类型]：1 代表开始，-1 代表结束
        events.push([start, 1]);
        events.push([end, -1]);
    }

    // 2. 排序事件
    // 核心考点：如果时间相同，该怎么办？
    // 必须先处理"结束"(-1)，再处理"开始"(+1)。
    // 比如 [10, 20] 和 [20, 30]，在 20 这一刻，
    // 如果先+1再-1，峰值是 2（错了，其实是无缝衔接，只需要 1）。
    // 所以排序时，如果 time 相同，type 小的（-1）排前面。
    events.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0]; // 按时间升序
        } else {
            return a[1] - b[1]; // 按类型升序 (-1 在 1 前面)
        }
    });

    let maxRooms = 0;
    let currentRooms = 0;

    // 3. 扫描事件
    for (const [time, type] of events) {
        currentRooms += type;
        // 每次变化后，都更新一下历史最大值
        maxRooms = Math.max(maxRooms, currentRooms);
    }

    return maxRooms;
};