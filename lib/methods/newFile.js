const { newFile } = require('firost');
const path = require('path');

/**
 * Wrapper around firost.newFile in the current repo
 * @param {string} filepath Relative path to the file
 **/
module.exports = async function (filepath) {
  await newFile(path.resolve(this.root, filepath));
};
