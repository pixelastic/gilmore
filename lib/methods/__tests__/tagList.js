import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/tagList');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('tagList', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return an empty array if no tags exist', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.tagList();
    expect(actual).toEqual([]);
  });
  it('should return a list of tags with isCurrent flag', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
    await repo.createTag('v1.0.0');

    await repo.newFile('file.txt');
    await repo.commitAll('second commit');
    await repo.createTag('v1.1.0');

    const actual = await repo.tagList();
    expect(actual).toEqual([
      { name: 'v1.0.0', isCurrent: false },
      { name: 'v1.1.0', isCurrent: true },
    ]);
  });
});
