const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/branchExists');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('branchExists', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return true if the branch exists', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.branchExists('main');
    expect(actual).toEqual(true);
  });
  it('should return false if the branch does not exist', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.branchExists('feature');
    expect(actual).toEqual(false);
  });
});
