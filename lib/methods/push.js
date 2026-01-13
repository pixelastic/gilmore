import { firostError } from 'firost';
/**
 * Push current branch and all tags to remote
 **/
export async function push() {
  const currentBranchName = await this.currentBranchName();
  const currentRemoteName = await this.currentRemoteName();
  if (!currentRemoteName) {
    throw new firostError(
      'GILMORE_PUSH_NO_REMOTE',
      `No remote configured for branch ${currentBranchName}`,
    );
  }

  const command = `push --set-upstream ${currentRemoteName} ${currentBranchName} --tags`;

  await this.run(command);
}
