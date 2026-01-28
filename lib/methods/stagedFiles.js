/**
 * Returns list of files currently in the staging area
 * @returns {Array|boolean} Array of file paths if successful, empty array if
 * nothing staged, false on error
 */
export async function stagedFiles() {
  try {
    const output = await this.run('diff --cached --name-only');
    if (!output) {
      return [];
    }
    return output.split('\n').filter(Boolean);
  } catch (_err) {
    return false;
  }
}
