/**
 * Returns data about a specific remote
 * @param {string} userRemoteName Name of the remote
 * @returns {object} Data about the remote, including:
 *  {string} name Name of the remote
 *  {string} url URL of the remote
 *  {boolean} isCurrent True if remote is the current one
 **/
export async function getRemote(userRemoteName) {
  const currentRemoteName = await this.currentRemoteName();

  // Use current remote by default
  const remoteName = userRemoteName || currentRemoteName;

  // Stop if remote does not exist
  if (!(await this.remoteExists(remoteName))) {
    return false;
  }

  // Grab data
  const url = await this.getConfig(`remote.${remoteName}.url`);
  const isCurrent = currentRemoteName === remoteName;
  return {
    name: remoteName,
    url,
    isCurrent,
  };
}
