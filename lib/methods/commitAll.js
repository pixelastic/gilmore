/**
 * Commit all changed files
 * @param {string} message Commit message
 **/

module.exports = async function (message) {
  await this.add();
  return await this.commit(message);
};
