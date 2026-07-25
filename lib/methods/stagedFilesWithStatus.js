import { parseNameStatus } from '../helper.js';
/**
 * Returns list of staged files with their status
 * @returns {Array<object>} Array of { name, status, from?, similarity? }
 */
export async function stagedFilesWithStatus() {
  const output = await this.run('diff --cached -M --name-status');
  return parseNameStatus(output);
}
