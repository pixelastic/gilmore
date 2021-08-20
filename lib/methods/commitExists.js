/**
 * Checks if the given commit exists
 * @param {string} hash Hash of the current commit
 * @returns {boolean} True if the commit exists
 **/
module.exports = async function (hash) {
  try {
    await this.run(`rev-parse --quiet --verify ${hash}`);
    return true;
  } catch (_err) {
    return false;
  }
};
