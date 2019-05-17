/**
 * Promisified setTimeout
 *
 * @param  {number} timeout Value to normalize
 * @return {promise}        Promise
 */
export default function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
