import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/currentBranchName');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('currentBranchName', () => {
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return the name of the current branch', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');
    const actual = await repo.currentBranchName();
    expect(actual).toBe('feature');
  });
  it('should return main by default', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.currentBranchName();
    expect(actual).toBe('main');
  });
  it('should return false if no branch yet created', async () => {
    await repo.init();
    const actual = await repo.currentBranchName();
    expect(actual).toBe(false);
  });
});
