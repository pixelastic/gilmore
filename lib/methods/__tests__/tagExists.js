import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/tagExists');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('tagExists', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return true if the tag exists', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
    await repo.createTag('v1.0.0');

    const actual = await repo.tagExists('v1.0.0');
    expect(actual).toBe(true);
  });
  it('should return false if the tag does not exist', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.tagExists('v1.0.0');
    expect(actual).toBe(false);
  });
});
