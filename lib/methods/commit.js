const { error: firostError } = require('firost');

const KNOWN_ERROR_CODES = {
  1: 'GILMORE_COMMIT_NOTHING_TO_COMMIT',
  128: 'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN',
};

/**
 * Commit files
 * @param {string} message Commit message
 * @returns {string} Current commit hash
 **/
module.exports = async function (message) {
  try {
    await this.run(`commit -m "${message}"`);
    return await this.currentCommit();
  } catch (err) {
    if (KNOWN_ERROR_CODES[err.code]) {
      throw new firostError(KNOWN_ERROR_CODES[err.code], err);
    }
    throw err;
  }
};
