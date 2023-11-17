/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const strArr = [...s];
  const validArr = [];
  strArr.forEach((char) => {
    if (
      (char.charCodeAt() >= "a".charCodeAt() &&
        char.charCodeAt() <= "z".charCodeAt()) ||
      (char.charCodeAt() >= "A".charCodeAt() &&
        char.charCodeAt() <= "Z".charCodeAt()) ||
      (char.charCodeAt() >= "0".charCodeAt() &&
        char.charCodeAt() <= "9".charCodeAt())
    ) {
      validArr.push(char.toLowerCase());
    }
  });
  let l = 0,
    r = validArr.length - 1;
  while (l < r) {
    if (validArr[l] !== validArr[r]) {
      return false;
    } else {
      l++;
      r--;
    }
  }
  return true;
};
