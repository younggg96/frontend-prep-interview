// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
 

// Example 1:


// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// Output: true
// Example 2:


// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
// Output: false
 

// Constraints:

// m == matrix.length
// n == matrix[i].length
// 1 <= n, m <= 300
// -109 <= matrix[i][j] <= 109
// All the integers in each row are sorted in ascending order.
// All the integers in each column are sorted in ascending order.
// -109 <= target <= 109


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if(matrix.length === 0){
        return false;
    }
    //start with top-right element
    var i = 0;
    var j = matrix[0].length - 1;
    
    //loop till row and column number are within bounds
    while(i <= matrix.length - 1 && j >= 0){
        
        if(matrix[i][j] > target){
            //current element is greater than target
            //means this row might have the target element
            //change column
            j--;
        }else if(matrix[i][j] === target){
            //element found
            return true;
        }else if(matrix[i][j] < target){
            //current element is lesser than target
            //means this column might have the target element
            //change rows
            i++;
        }
    }
    return false;
};


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let m = matrix.length, n = matrix[0].length;
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
    for(let i = 0; i < m; i++) {
        if(binarySearch(matrix[i])) return true;
    }
    return false;
};

let matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5;
searchMatrix(matrix, target)