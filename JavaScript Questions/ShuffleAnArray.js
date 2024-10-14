// How would you implement a shuffle() ?

// When passed with an array, it should modify the array inline to generate a randomly picked permutation at the same probability.

// for an array like this:

// const arr = [1, 2, 3, 4]
// there would be possibly 4! = 24 permutations

// [1, 2, 3, 4]
// [1, 2, 4, 3]
// [1, 3, 2, 4]
// [1, 3, 4, 2]
// [1, 4, 2, 3]
// [1, 4, 3, 2]
// [2, 1, 3, 4]
// [2, 1, 4, 3]
// [2, 3, 1, 4]
// [2, 3, 4, 1]
// [2, 4, 1, 3]
// [2, 4, 3, 1]
// [3, 1, 2, 4]
// [3, 1, 4, 2]
// [3, 2, 1, 4]
// [3, 2, 4, 1]
// [3, 4, 1, 2]
// [3, 4, 2, 1]
// [4, 1, 2, 3]
// [4, 1, 3, 2]
// [4, 2, 1, 3]
// [4, 2, 3, 1]
// [4, 3, 1, 2]
// [4, 3, 2, 1]
// your shuffle() should transform the array in one of the above array, at the same 1/24 probability.

// notes

// Your shuffle() will be called multiple times, to calculate the probability on each possible result, and test again standard deviation

// ref: https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

