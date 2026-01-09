/**
 * Checks if the specified branch exists
 * @param {string} branchName Name of the branch to check
 * @returns {boolean} True if the branch exists, false otherwise
 **/
export async function branchExists(branchName) {
  try {
    await this.run(`show-ref --verify --quiet refs/heads/${branchName}`);
    return true;
  } catch (_err) {
    return false;
  }
}
