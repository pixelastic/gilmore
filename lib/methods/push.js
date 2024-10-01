import { error: firostError } from 'firost';
/**
 * Push current repository to remote
 **/
export default async function () {
  const currentBranchName = await this.currentBranchName();
  const currentRemoteName = await this.currentRemoteName();
  if (!currentRemoteName) {
    throw new firostError(
      'GILMORE_PUSH_NO_REMOTE',
      `No remote configured for branch ${currentBranchName}`
    );
  }

  const command = `push --set-upstream ${currentRemoteName} ${currentBranchName}`;

  await this.run(command);
};
