// Please implement your own Array.prototype.map().

// [1,2,3].myMap(num => num * 2)
// please avoid using Array.prototype.map() directly in your code.


// callbackFn
// A function to execute for each element in the array. Its return value is added as a single element in the new array. The function is called with the following arguments:

// element
// The current element being processed in the array.

// index
// The index of the current element being processed in the array.

// array
// The array map() was called upon.

// thisArg Optional
// A value to use as this when executing callbackFn.

Array.prototype.myMap = function (callback, thisArg) {
  const length = this.length
  const result = new Array(length)

  for (let i = 0; i < length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
}