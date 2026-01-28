import { _ } from 'golgoth';
/**
 * Returns list of files currently in the staging area
 * @returns {Array|boolean} Array of file paths if successful, empty array if
 * nothing staged, false on error
 */
export async function stagedFiles() {
  const output = await this.run('diff --cached --name-only');
  return _.chain(output).split('\n').compact().value();
}
