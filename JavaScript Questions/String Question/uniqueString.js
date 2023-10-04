const uniqueStr = (str) => {
  const arr = [];
  for (let char of str) {
    if (!arr.includes(char)) {
      arr.push(char);
    }
  }
  return arr.join("");
};

const uniqueStr2 = (str) => {
  return [...new Set([...str])].join("");
};
