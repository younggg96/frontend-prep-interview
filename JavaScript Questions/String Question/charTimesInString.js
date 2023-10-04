const str = "aassdgvdvcdfxccwdfwgvfsd";

const res = str.split("").reduce((prev, cur) => {
  return prev[cur]++ || (prev[cur] = 1), prev;
}, {});

console.log(res);
// { a: 2, s: 3, d: 5, g: 2, v: 3, c: 3, f: 3, x: 1, w: 2 }