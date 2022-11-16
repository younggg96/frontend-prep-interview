/**
 * @param {Array<any>} list
 * @returns {void}
 *
 *  const list = [1,0,0,2,3]
    moveZeros(list)
    console.log(list) // [1,2,3,0,0]
 */
function moveZeros(list) {
  let index = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0) {
      [list[index++], list[i]] = [list[i], list[index]];
    }
  }
}
