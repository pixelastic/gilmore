const { _ } = require('golgoth');

/**
 * Add files to the staging area
 * @param {Array} files List of files to add. Leave it empty to add all files
 **/
module.exports = async function (files = []) {
  const fileArgument = _.isEmpty(files) ? '-A' : files.join(' ');

  await this.run(`add ${fileArgument}`);
};
