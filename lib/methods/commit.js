/**
 * Commit files
 * @param {string} message Commit message
 **/
module.exports = async function (message) {
  await this.run(`commit -m "${message}"`);
};

// TODO:
// Should throw an error if no files to commit
// Should allow a force: true to commit even if empty
// Should allow special characters and quotes in message without failing
// Should have a syntactic sugar to automatically add all files
// and/or to only add a specific subset
