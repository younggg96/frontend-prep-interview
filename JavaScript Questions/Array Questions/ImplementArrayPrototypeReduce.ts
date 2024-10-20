// Array.prototype.reduce() is a handy method to process arrays.

// Here is a simple task - Could you implement it by yourself?

// [1,2,3].myReduce((sum, item) => sum + item)
// // 6
// do not use native Array.prototype.reduce() in your code
// your function is only tested against valid array (no array-like objects)
// thanks to pajadev for suggesting this

// copied from lib.es5.d.ts
declare interface Array<T> {
  myReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  myReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  myReduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
}

Array.prototype.myReduce = function (callbackfn: Function, ...rest: any[]) {
  // your code here
  let accumulator = rest[0];
  let index = 0;
  if (!rest.length) {
    if (!this.length) {
      throw new Error('Reduce of empty array with no initial value');
    }
    accumulator = this[0];
    index++;
  }
  while(index < this.length) {
    accumulator = callbackfn(accumulator, this[index], index, this);
    index++;
  }
  return accumulator
}