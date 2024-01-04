const { emptyDir, tmpDirectory, isDirectory } = require('firost');
const path = require('path');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/init');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('init', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should create a .git folder', async () => {
    await repo.init();
    const actual = await isDirectory(path.resolve(repo.root, '.git'));
    expect(actual).toEqual(true);
  });
  it('bare: true should create a bare repo', async () => {
    await repo.init({ bare: true });
    const actual = await isDirectory(path.resolve(repo.root, '.git'));
    expect(actual).toEqual(false);
  });
  it('should not have a branch name at first', async () => {
    await repo.init();
    const actual = await repo.currentBranchName();
    expect(actual).toEqual(false);
  });
  it('should have the main branch set as "main" on first commit', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.currentBranchName();
    expect(actual).toEqual('main');
  });
});
