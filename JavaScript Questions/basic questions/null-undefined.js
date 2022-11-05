console.log(JSON.stringify([1, 2, null, 3])); // happy path: "[1,2,null,3]"
console.log(JSON.stringify([1, 2, undefined, 3])); // JSON doesn't have undefined value, it's replaced with null in JSON data type.
console.log(null === undefined); // null -> 0 and undefined -> NaN, then NOT strictly equal
console.log(null == undefined); // Special rule: true -> Just Remember it
console.log(null == 0); // Special rule: null is not converted to 0 here
console.log(null < 0); // false: null -> 0
console.log(null > 0); // false: null -> 0
console.log(null <= 0); // true: null -> 0
console.log(null >= 0); // true: null -> 0
console.log(undefined == 0); // false: undefined -> NaN
console.log(undefined < 0); // false: undefined -> NaN
console.log(undefined > 0); // false: undefined -> NaN
console.log(undefined <= 0); // false: undefined -> NaN
console.log(undefined >= 0); // false: undefined -> NaN
// Notes:

// When converting to Number, null and undefined are handled differently: null becomes 0, whereas undefined becomes NaN.

// When applying == to null or undefined, numeric conversion does not happen. null equals only to null or undefined, and does not equal to anything else.

// null == 0  // false, null is not converted to 0
// null == null  // true
// undefined == undefined  // true
// null == undefined  // true
// Final Solution:

// "[1,2,null,3]"
// "[1,2,null,3]"
// false
// true
// false
// false
// false
// true
// true
// false
// false
// false
// false
// false
