/**
 * Returns the name of the current remote
 * @returns {string} Name of the current remote
 **/
module.exports = async function () {
  const currentBranchName = await this.currentBranchName();

  // Clean repos don't yet have a branch, so they don't have a remote
  if (!currentBranchName) {
    return false;
  }

  const remoteName = await this.getConfig(`branch.${currentBranchName}.remote`);
  return remoteName ? remoteName : false;
};
