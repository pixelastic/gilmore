import { firostError } from 'firost';

/**
 * Push current branch to remote
 **/
export async function pushBranch() {
  const currentBranchName = await this.currentBranchName();
  const currentRemoteName = await this.currentRemoteName();
  if (!currentRemoteName) {
    throw new firostError(
      'GILMORE_PUSH_BRANCH_NO_REMOTE',
      `No remote configured for branch ${currentBranchName}`,
    );
  }

  const command = `push --set-upstream ${currentRemoteName} ${currentBranchName}`;

  await this.run(command);
}
