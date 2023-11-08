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