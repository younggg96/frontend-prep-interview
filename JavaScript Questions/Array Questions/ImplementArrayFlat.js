// Array.prototype.flat()可以用来扁平化数组。

// 你能够自己实现一个flat么？

// const arr = [1, [2], [3, [4]]];

// flat(arr)
// // [1, 2, 3, [4]]

// flat(arr, 1)
// // [1, 2, 3, [4]]

// flat(arr, 2)
// // [1, 2, 3, 4]
// 追问

// 能否不用递归而用迭代的方式实现？

const flatWithLevel = (arr, num = 1) => {
  return num > 0
    ? arr.reduce((pre, cur) => {
        return pre.concat(
          Array.isArray(cur) ? flatWithLevel(cur, num - 1) : cur
        );
      }, [])
    : arr.slice();
};

const flatWithLevelWithStack = (arr, num = 1) => {
  const stack = [...arr.map((item) => [item, num])];
  const result = [];
  while (stack.length) {
    const [top, num] = stack.pop();
    if (Array.isArray(top) && num > 0) {
      stack.push(...top.map((item) => [item, num - 1]));
    } else {
      result.unshift(top);
    }
  }
  return result;
};

const flat = (arr) => {
  let arrResult = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      //   arrResult = arrResult.concat(flat(item)); // 递归
      // 或者用扩展运算符
      arrResult.push(...flat(item));
    } else {
      arrResult.push(item);
    }
  });
  return arrResult;
};

const flat2 = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
};

const flat3 = (arr) => {
  const result = [];
  const stack = [...arr];
  while (stack.length) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val);
    } else {
      result.unshift(val);
    }
  }
  return result;
};

// const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

// 不传参数时，默认“拉平”一层
// animals.flat();
// // ["🐷", "🐶", "🐂", "🐎", ["🐑", ["🐲"]], "🐛"]

// // 传入一个整数参数，整数即“拉平”的层数
// animals.flat(2);
// // ["🐷", "🐶", "🐂", "🐎", "🐑", ["🐲"], "🐛"]

// // Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
// animals.flat(Infinity);
// // ["🐷", "🐶", "🐂", "🐎", "🐑", "🐲", "🐛"]

// // 传入 <=0 的整数将返回原数组，不“拉平”
// animals.flat(0);
// animals.flat(-10);
// // ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

// // 如果原数组有空位，flat()方法会跳过空位。
// ["🐷", "🐶", "🐂", "🐎", ,].flat();
// // ["🐷", "🐶", "🐂", "🐎"]

// Array.prototype.flat()  特性总结

// Array.prototype.flat() 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
// 不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
// 传入 <=0 的整数将返回原数组，不“拉平”
// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
// 如果原数组有空位，Array.prototype.flat() 会跳过空位。

const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "string",
  { name: "弹铁蛋同学" },
];
arr instanceof Array;
// true
arr.constructor === Array;
// true
Object.prototype.toString.call(arr) === "[object Array]";
// true
Array.isArray(arr);
// true
