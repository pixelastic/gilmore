const { write } = require('firost');
const path = require('path');

/**
 * Wrapper around firost.write in the current repo
 * @param {string} content Content to write to the file
 * @param {string} filepath Relative path to the file
 **/
module.exports = async function (content, filepath) {
  await write(content, path.resolve(this.root, filepath));
};
