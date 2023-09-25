/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
// var reverseBits = function(n) {
//     const newN = n;
//     const reverse = newN.toString().split('').reverse();
//     console.log(reverse.toString().split('').join(''));
//     let sum = 0;
//     for(let i = reverse.length - 1; i >= 0; i--) {
//         sum += Math.pow(2, i);
//     }
//     console.log(sum);
//     return sum;
// };

// reverseBits("00000010100101000001111010011100");
// 00000010100101000001111010011100 & 1

console.log(11101111 & 1);