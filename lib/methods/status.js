/**
 * Returns a list of all new/added/modified/deleted files, much like git status
 * @returns {Array} List of changed files with their path and type, or false if
 * an error occured
 **/
module.exports = async function () {
  try {
    const output = await this.run('status --short');
    if (!output) {
      return [];
    }

    return this.parseStatus(output);
  } catch (_err) {
    return false;
  }
};
