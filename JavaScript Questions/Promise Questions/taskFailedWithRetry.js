/**
 * send request, return promise
 * @param {string} url
 * @param {number} maxCount retry times
 */

function request(url, maxCount) {
  return fatch(url).catch((err) => {
    maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1);
  });
}
