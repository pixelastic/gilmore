/**
 * Returns the sha of the current commit
 * @returns {string} Sha of the current commit
 **/
module.exports = async function () {
  try {
    return await this.run('rev-parse --short HEAD');
  } catch (_err) {
    return false;
  }
};
// TODO: Should return a long form with long: true
