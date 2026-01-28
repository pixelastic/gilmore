import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/stagedFiles');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('stagedFiles', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });

  it('should return empty array when nothing staged', async () => {
    await repo.newFile('README.md');

    const actual = await repo.stagedFiles();

    expect(actual).toEqual([]);
  });

  it('should return staged file', async () => {
    await repo.newFile('file.js');
    await repo.add('file.js');

    const actual = await repo.stagedFiles();

    expect(actual).toEqual(['file.js']);
  });

  it('should return all staged files', async () => {
    await repo.newFile('file1.js');
    await repo.newFile('file2.js');
    await repo.add();

    const actual = await repo.stagedFiles();

    expect(actual).toEqual(['file1.js', 'file2.js']);
  });

  it('should include file with both staged and unstaged changes', async () => {
    await repo.newFile('file.js');
    await repo.add('file.js');
    await repo.writeFile('file.js', 'v2');

    const actual = await repo.stagedFiles();

    expect(actual).toEqual(['file.js']);
  });

  it('should return only staged files when mix exists', async () => {
    await repo.newFile('staged.js');
    await repo.newFile('unstaged.js');
    await repo.add('staged.js');

    const actual = await repo.stagedFiles();

    expect(actual).toEqual(['staged.js']);
  });
});
