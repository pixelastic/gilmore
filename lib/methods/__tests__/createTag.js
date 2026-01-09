import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/createTag');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('createTag', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should create a lightweight tag', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.createTag('v1.0.0');

    const actual = await repo.tagExists('v1.0.0');
    expect(actual).toEqual(true);
  });
});
