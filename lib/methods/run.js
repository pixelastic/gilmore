import { env, mkdirp, run } from 'firost';

/**
 * Run a git command in the repo
 *
 * @param {string} gitCommand Git command to run
 * @returns {string} Command output
 */
export default async function (gitCommand) {
  // Create the root if it does not yet exist
  await mkdirp(this.root);

  // Prevent using ~/.gitconfig if globalConfig is disabled
  const home = this.options.globalConfig ? env('HOME') : '';

  const command = `git ${gitCommand}`;

  const result = await run(command, {
    shell: true,
    stderr: false,
    stdout: false,
    cwd: this.root,
    env: {
      HOME: home,
    },
  });
  return result.stdout;
}
