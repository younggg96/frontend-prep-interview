# Binary Search 二分搜索

技巧

```
let mid = Math.floor((end - start) / 2) + start;


const binarySearch = (arr) => {
    let l = 0, r = arr.length - 1, mid;
    while(l <= r) {
        mid = Math.floor((l + r) / 2);
        if(arr[mid] === target) return true;
        if(arr[mid] > target) r = mid - 1;
        if(arr[mid] < target) l = mid + 1;
    }
    return false;
}

```

技巧 如果有序数组中存在多个 target 的元素，那么这些元素肯定都挨在一起，
里就涉及到算法应该返回最左侧的那个 target 元素的索引还是最右侧的那个 target 元素的索引，
也就是所谓的「搜索左侧边界」和「搜索右侧边界」，这个也可以通过微调算法的代码来实现。

1. 寻找一个数

- 因为我们初始化 right = nums.length - 1
  所以决定了我们的「搜索区间」是 [left, right]
  所以决定了 while (left <= right)
  同时也决定了 left = mid+1 和 right = mid-1

因为我们只需找到一个 target 的索引即可
所以当 nums[mid] == target 时可以立即返回

2. 搜索左侧边界的数

- 因为我们初始化 right = nums.length
  所以决定了我们的「搜索区间」是 [left, right)
  所以决定了 while (left < right)
  同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最左侧索引
所以当 nums[mid] == target 时不要立即返回
而要收紧右侧边界以锁定左侧边界

3. 搜索右侧边界的数

- 因为我们初始化 right = nums.length
  所以决定了我们的「搜索区间」是 [left, right)
  所以决定了 while (left < right)
  同时也决定了 left = mid + 1 和 right = mid

因为我们需找到 target 的最右侧索引
所以当 nums[mid] == target 时不要立即返回
而要收紧左侧边界以锁定右侧边界

又因为收紧左侧边界时必须 left = mid + 1
所以最后无论返回 left 还是 right，必须减一

```
var binary_search = function(nums, target) {
    var left = 0, right = nums.length - 1;
    while(left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if(nums[mid] == target) {
            // 直接返回
            return mid;
        }
    }
    // 直接返回
    return -1;
}

var left_bound = function(nums, target) {
    var left = 0, right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 别返回，锁定左侧边界
            right = mid - 1;
        }
    }
    // 判断 target 是否存在于 nums 中
    if (left < 0 || left >= nums.length) {
        return -1;
    }
    // 判断一下 nums[left] 是不是 target
    return nums[left] == target ? left : -1;
}

var right_bound = function(nums, target) {
    var left = 0, right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 别返回，锁定右侧边界
            left = mid + 1;
        }
    }
    // 判断 target 是否存在于 nums 中
    // if (left - 1 < 0 || left - 1 >= nums.length) {
    //     return -1;
    // }

    // 由于 while 的结束条件是 right == left - 1，且现在在求右边界
    // 所以用 right 替代 left - 1 更好记
    if (right < 0 || right >= nums.length) {
        return -1;
    }
    return nums[right] == target ? right : -1;
}

```

## 泛化

抽象出一个自变量 x， 一个关于 x 的函数 f(x), 以及一个目标值 target

满足以下几个条件

1. f(x) 必须是在 x 上的单调函数（单调增单调减都可以）。

2. 题目是让你计算满足约束条件 f(x) == target 时的 x 的值。

上述规则听起来有点抽象，来举个具体的例子：

给你一个升序排列的有序数组 nums 以及一个目标元素 target，请你计算 target 在数组中的索引位置，如果有多个目标元素，返回最小的索引。
我们可以把数组中元素的索引认为是自变量 x，函数关系 f(x) 就可以这样设定

```
var f = function(x, nums) {
    return nums[x];
};

var left_bound = function(nums, target) {
    if (nums.length === 0) return -1;
    var left = 0, right = nums.length;

    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        if (f(mid, nums) === target) {
            // 当找到 target 时，收缩右侧边界
            right = mid;
        } else if (f(mid, nums) < target) {
            left = mid + 1;
        } else if (f(mid, nums) > target) {
            right = mid;
        }
    }
    return left;
};
```

具体来说，想要用二分搜索算法解决问题，分为以下几步：

1、确定 x, f(x), target 分别是什么，并写出函数 f 的代码。

2、找到 x 的取值范围作为二分搜索的搜索区间，初始化 left 和 right 变量。

3、根据题目的要求，确定应该使用搜索左侧还是搜索右侧的二分搜索算法，写出解法代码。