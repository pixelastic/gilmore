/**
 * Returns the name of the current branch
 * @returns {string} Name of the current branch
 **/
module.exports = async function () {
  return await this.run('rev-parse --abbrev-ref HEAD');
};
