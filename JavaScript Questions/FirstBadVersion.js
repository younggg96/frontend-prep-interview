// 一个程序有多个版本，不知道什么时候开始有个bug混在其中。请你找到第一个坏掉的版本。

// 特定版本是否有bug，可以用isBad(revision)进行判定。

// 注意

// 传入的都是非负整数
// 如果没有找到，返回-1

// This is a JavaScript coding problem from BFE.dev

/**
 * @typedef {(version: number) => boolean} IsBad
 */

/**
 * @param {IsBad} isBad
 * @return {(v: number) => number}
 */
function firstBadVersion(isBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  const checkVersion = (version) =>
    isBad(version) ? checkVersion(version - 1) : version + 1;
  return (version) => {
    // write your code to return the first bad version
    // if none found, return -1
    return isBad(version) ? checkVersion(version) : -1;
  };
}

const check = firstBadVersion((i) => {
  return i >= 4;
});

check(100);
