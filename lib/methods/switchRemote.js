import { firostError } from 'firost';
/**
 * Switch to the specified remote
 * @param {string} remoteName Name of the remote
 **/
export async function switchRemote(remoteName) {
  // Check that the remote actually exists
  if (!(await this.remoteExists(remoteName))) {
    throw new firostError(
      'GILMORE_REMOTE_SWITCH_UNKNOWN_REMOTE_NAME',
      `The remote ${remoteName} does not exist`,
    );
  }

  const currentBranchName = await this.currentBranchName();
  await this.setConfig(`branch.${currentBranchName}.remote`, remoteName);
}
