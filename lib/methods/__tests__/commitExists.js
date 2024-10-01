import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/commitExists');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('commitExists', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return true for existing commit', async () => {
    await repo.init();
    await repo.newFile('README.md');
    const commit = await repo.commitAll();

    const actual = await repo.commitExists(commit);
    expect(actual).toBe(true);
  });
  it('should return false for missing commit', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll();

    const actual = await repo.commitExists('random-hash');
    expect(actual).toBe(false);
  });
});
