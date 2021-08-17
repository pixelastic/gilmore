const { run, mkdirp } = require('firost');

/**
 * Run a git command in the repo
 *
 * @param {string} gitCommand Git command to run
 * @returns {string} Command output
 */
module.exports = async function (gitCommand) {
  // Create the root if it does not yet exist
  await mkdirp(this.root);

  const result = await run(`cd ${this.root} && git ${gitCommand}`, {
    shell: true,
    stderr: false,
    stdout: false,
  });
  return result.stdout;
};
