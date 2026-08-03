import { _ } from 'golgoth';
import { env, run as firostRun, mkdirp } from 'firost';

/**
 * Run a git command in the repo
 *
 * @param {string|string[]} gitCommand Git command to run
 * @returns {string} Command output
 */
export async function run(gitCommand) {
  // Create the root if it does not yet exist
  await mkdirp(this.root);

  // Prevent using ~/.gitconfig if globalConfig is disabled
  const home = this.options.globalConfig ? env('HOME') : '';

  let command = `git ${gitCommand}`;
  let shell = true;
  if (_.isArray(gitCommand)) {
    command = ['git', ...gitCommand];
    shell = false;
  }

  const result = await firostRun(command, {
    shell,
    stderr: false,
    stdout: false,
    cwd: this.root,
    env: {
      HOME: home,
      GIT_DIR: undefined,
      GIT_WORK_TREE: undefined,
      GIT_INDEX_FILE: undefined,
      GIT_CEILING_DIRECTORIES: undefined,
    },
  });
  return result.stdout;
}
