// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

// Return any possible rearrangement of s or return "" if not possible.

 

// Example 1:

// Input: s = "aab"
// Output: "aba"
// Example 2:

// Input: s = "aaab"
// Output: ""
 

// Constraints:

// 1 <= s.length <= 500
// s consists of lowercase English letters.

/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
    const map = new Map();
    const maxHeap = new MaxPriorityQueue();
    const sArr = s.split('');
    const res = [];
    for (let i = 0; i < sArr.length; i++) {
        if (map.has(sArr[i])) {
            map.set(sArr[i], map.get(sArr[i]) + 1);
        } else {
            map.set(sArr[i], 1);
        }
    }
    // console.log(map)
    for (let item of map) {
        console.log(maxHeap)
        if (item[1] === 0) {
            break;
        }
        maxHeap.enqueue(item[0], item[1]);
    }

    let prev = null;
    while (!maxHeap.isEmpty()) {
        const item = maxHeap.dequeue().element;
        map.set(item, map.get(item) - 1);
        if(prev != null && map.get(prev) > 0) {
            maxHeap.enqueue(prev, map.get(prev));
        }
        res.push(item);
        prev = item;
    }

    if(res.length !== sArr.length) return ''
    return res.join('')

};