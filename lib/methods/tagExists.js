/**
 * Checks if the specified tag exists locally
 * @param {string} tagName Name of the tag to check
 * @returns {boolean} True if the tag exists, false otherwise
 **/
export async function tagExists(tagName) {
  try {
    await this.run(`show-ref --verify --quiet refs/tags/${tagName}`);
    return true;
  } catch (_err) {
    return false;
  }
}
