// 实现一个方法，扁平化如下数据
// 原数据
// const obj1 = {
//   a: 1,
//   b: {
//     f: "2",
//     g: "3",
//   },
//   c: {
//     d: [
//       1,
//       2,
//       {
//         e: true,
//       },
//     ],
//   },
// };
// // 转化为
// const obj3 = {
//   a: 1,
//   "b.f": "2",
//   "b.g": "3",
//   "c.d[0]": 1,
//   "c.d[1]": 2,
//   "c.d[2].e": true,
// };
function flattenObject(obj, parentKey = "") {
  let result = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const nestedKeys = flattenObject(obj[key], `${parentKey}${key}.`);
      result = { ...result, ...nestedKeys };
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        if (typeof item === "object") {
          const nestedKeys = flattenObject(
            item,
            `${parentKey}${key}[${index}].`
          );
          result = { ...result, ...nestedKeys };
        } else {
          result[`${parentKey}${key}[${index}]`] = item;
        }
      });
    } else {
      result[`${parentKey}${key}`] = obj[key];
    }
  }

  return result;
}

const obj = {
  a: 1,
  b: {
    f: "2",
    g: "3",
  },
  c: {
    d: [1, 2, { e: true }],
  },
};

const obj1 = {
  a: 1,
  b: {
    f: "2",
    g: "3",
  },
  c: {
    d: [
      1,
      2,
      {
        e: true,
      },
    ],
  },
};

const obj2 = flattenObject(obj1);
console.log(flattenObject(obj1));

// 转化为
// const obj2 = {
//   a: 1,
//   "b.f": "2",
//   "b.g": "3",
//   "c.d[0]": 1,
//   "c.d[1]": 2,
//   "c.d[2].e": true,
// };