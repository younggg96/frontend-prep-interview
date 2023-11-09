/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const len = citations.length;
    let l = 0, r = len - 1, mid;
    while(l <= r) {
        mid = Math.floor((l + r) / 2);
        if(citations[mid] >= len - mid) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return len - l;
};