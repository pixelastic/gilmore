/**
 * Returns the list of changed files between two commits
 * @param {string} fromCommit Start of the commit range
 * @param {string} toCommit End of the commit range, or current commit it empty
 * @returns {Array} List of changed files with their name and status
 **/
module.exports = async function (fromCommit, toCommit = 'HEAD') {
  const output = await this.run(`diff --name-status ${fromCommit} ${toCommit}`);
  return this.parseStatus(output);
};
