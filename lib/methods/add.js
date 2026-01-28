import { _ } from 'golgoth';

/**
 * Adds files to the staging area
 * @param {string|string[]} userFiles - File path(s) to add, or empty to add all files
 */
export async function add(userFiles) {
  const fileArgument = _.isEmpty(userFiles)
    ? '-A'
    : _.chain(userFiles).castArray().join(' ').value();

  await this.run(`add ${fileArgument}`);
}
