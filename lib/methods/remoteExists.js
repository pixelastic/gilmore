/**
 * Checks if the specified remote exists locally
 * @param {string} remoteName Name of the remote to check
 * @returns {boolean} True if the remote exists, false otherwise
 **/
export async function remoteExists(remoteName) {
  const remoteUrl = await this.getConfig(`remote.${remoteName}.url`);
  return !!remoteUrl;
}
