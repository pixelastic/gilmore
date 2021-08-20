const { error: firostError } = require('firost');
const { _ } = require('golgoth');

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
    if (_.includes(err.toString(), 'nothing to commit')) {
      throw new firostError('GILMORE_COMMIT_NOTHING_TO_COMMIT', err);
    }
    throw err;
  }
};

// TODO:
// Should throw an error if no files to commit
// Should allow a force: true to commit even if empty
// Should allow special characters and quotes in message without failing
// Should have a syntactic sugar to automatically add all files
// and/or to only add a specific subset
