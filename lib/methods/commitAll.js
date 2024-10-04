/**
 * Commit all changed files
 * @param {string} message Commit message
 * @param {object} options Additional options, same as commit()
 * @returns {string} Current commit hash
 **/
export default async function commitAll(message, options = {}) {
  await this.add();
  return await this.commit(message, options);
}
