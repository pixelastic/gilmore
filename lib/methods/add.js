import { _ } from 'golgoth';

/**
 * Adds files to the staging area
 * @param {string|string[]} userFiles - File path(s) to add, or empty to add all files
 */
export async function add(userFiles) {
  // No file means all files
  if (_.isEmpty(userFiles)) {
    await this.run('add -A');
    return;
  }

  // Use array form to bypass all quote issues with spaces in filenames
  await this.run(['add', ..._.castArray(userFiles)]);
}
