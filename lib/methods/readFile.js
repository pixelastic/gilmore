const { read } = require('firost');
const path = require('path');

/**
 * Returns the content of a file at a specific commit
 * @param {string} filepath Relative path to the file
 * @param {string} commit Reference to the commit
 * @returns {boolean|string} Content of the file, or false if file missing
 **/
module.exports = async function (filepath, commit) {
  try {
    // No commit specified? It acts as a regular file read on disk
    if (!commit) {
      return await read(path.resolve(this.root, filepath));
    }
    return await this.run(`show ${commit}:${filepath}`);
  } catch (_err) {
    return false;
  }
};
