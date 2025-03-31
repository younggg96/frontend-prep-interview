// Object.groupBy() allows us to easily group array items, please try to implement it by yourself.

const items = [
  {
    id: 1,
    kind: "a",
  },
  {
    id: 2,
    kind: "b",
  },
  {
    id: 3,
    kind: "a",
  },
];
// const groups = Object.groupBy(items, ({ kind }) => kind);
// {
//   a: [
//     {
//       id: 1,
//       kind: 'a'
//     },
//     {
//       id: 3,
//       kind: 'a'
//     }
//   ],
//   b: [
//     {
//       id: 2,
//       kind: 'b'
//     }
//   ]
// }

function myGroupBy(obj, func) {
    const res = {};
    for(let item of obj) {
      let target = func(item);
      if(!(target in res)) {
        res[target] = new Array();
      }
      console.log(res)
      res[target].push(item);
    }

    return res;
}

myGroupBy(items, ({ kind }) => kind);