import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/remoteExists');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('remoteExists', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return true if the remote exists locally', async () => {
    await repo.createRemote('origin', 'git@origin.com');

    const actual = await repo.remoteExists('origin');
    expect(actual).toBe(true);
  });
  it('should return false if the remote does not exist locally', async () => {
    await repo.createRemote('origin', 'git@origin.com');

    const actual = await repo.remoteExists('fork');
    expect(actual).toBe(false);
  });
});
