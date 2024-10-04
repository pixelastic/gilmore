/**
 * Returns the hash of the current commit
 * @returns {string} Hash of the current commit
 **/
export default async function () {
  try {
    return await this.run('rev-parse --short HEAD');
  } catch (_err) {
    return false;
  }
}
// TODO: Should return a long form with long: true
