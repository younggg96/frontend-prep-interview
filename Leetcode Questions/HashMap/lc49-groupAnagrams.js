// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]

// Constraints:

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map();
    for (let i = 0; i < strs.length; i++) {
        const code = helper(strs[i]);
        console.log(code, strs[i]);
        if (!map.has(code)) {
            map.set(code, []);
        }
        map.get(code).push(strs[i]);
    }
    let res = [];
    for (let group of map.values()) {
        res.push(group);
    }
    return res;
};

const helper = (str) => {
    const res = new Array(26).fill(0);
    [...str].forEach((item) => {
        res[item.charCodeAt() - "a".charCodeAt()]++;
    });
    return res.toString();
};

const strs = ["bdddddddddd","bbbbbbbbbbc"];
groupAnagrams(strs);
