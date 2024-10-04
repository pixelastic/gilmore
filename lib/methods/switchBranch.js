/**
 * Switch to the specified branch, or create it if missing
 * @param {string} branchName Name of the branch
 **/
export default async function (branchName) {
  // Create the branch first if it does not exist
  if (!(await this.branchExists(branchName))) {
    await this.run(`checkout -b ${branchName}`);
    return;
  }

  await this.run(`checkout ${branchName}`);
}
