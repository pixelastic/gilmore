/**
 * Returns the name of the current branch
 * @returns {string} Name of the current branch
 **/
export default async function () {
  try {
    return await this.run('rev-parse --abbrev-ref HEAD');
  } catch (_err) {
    return false;
  }
}
