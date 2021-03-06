/**
 * Commit all changed files
 * @param {string} message Commit message
 * @param {object} options Additional options, same as commit()
 **/

module.exports = async function (message, options = {}) {
  await this.add();
  return await this.commit(message, options);
};
