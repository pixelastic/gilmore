import path from 'node:path';
import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const testDirectory = tmpDirectory('gilmore/pushBranch');
const repoPath = path.resolve(testDirectory, 'repo');
const remotePath = path.resolve(testDirectory, 'remote');
const repo = new Gilmore(repoPath, { globalConfig: false });
const remote = new Gilmore(remotePath, { globalConfig: false });

describe('pushBranch', () => {
  beforeEach(async () => {
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('initial commit');

    await remote.init({ bare: true });
  });
  afterEach(async () => {
    await remove(testDirectory);
  });
  it('should push current branch to the remote', async () => {
    await repo.setRemote('origin', `file://${remotePath}`);

    const commitInRepo = await repo.currentCommit();
    await repo.pushBranch();
    const commitInRemote = await remote.currentCommit();

    expect(commitInRepo).toEqual(commitInRemote);
  });
  it('should fail if no current remote', async () => {
    let actual;
    try {
      await repo.pushBranch();
    } catch (err) {
      actual = err;
    }

    expect(actual).toHaveProperty('code', 'GILMORE_PUSH_BRANCH_NO_REMOTE');

    const commitInRemote = await remote.currentCommit();
    expect(commitInRemote).toBe(false);
  });
});
