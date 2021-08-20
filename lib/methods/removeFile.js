const { remove } = require('firost');
const path = require('path');

/**
 * Deletes the file in repo at the specified filepath
 * @param {string} filepath Relative path to the file
 **/
module.exports = async function (filepath) {
  await remove(path.resolve(this.root, filepath));
};
