// 数组求和
// 不可以用循环，也不可以用标准库的函数

const nums = [5, 1, 3, 6, 2];

function sum(i) {
  console.log(i, nums[i]);
  return i >= nums.length ? 0 : nums[i] + sum(i + 1);
}

console.log(sum(0));
