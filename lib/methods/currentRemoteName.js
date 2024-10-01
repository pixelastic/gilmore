/**
 * Returns the name of the current remote
 * @returns {string} Name of the current remote
 **/
export default async function () {
  let remoteName = null;

  // If a branch is defined, then the remote might be read from the branch
  // config
  const currentBranchName = await this.currentBranchName();
  if (currentBranchName) {
    remoteName = await this.getConfig(`branch.${currentBranchName}.remote`);
    if (remoteName) {
      return remoteName;
    }
  }

  // We couldn't find the branch config, then we'll check if there is a remote
  // called "origin" configured, even if unused
  const originUrl = await this.getConfig('remote.origin.url');
  return originUrl ? 'origin' : false;
};
