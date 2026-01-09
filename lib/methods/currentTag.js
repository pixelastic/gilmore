/**
 * Returns the current tag (the most recent tag reachable from HEAD)
 * @returns {string|boolean} Name of the current tag, or false if no tag found
 **/
export async function currentTag() {
  try {
    return await this.run('describe --tags --abbrev=0');
  } catch (_err) {
    return false;
  }
}
