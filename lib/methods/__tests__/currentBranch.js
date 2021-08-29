const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/currentBranch');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('currentBranch', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return the name of the current branch', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');
    const actual = await repo.currentBranch();
    expect(actual).toEqual('feature');
  });
  it('should return master by default', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.currentBranch();
    expect(actual).toEqual('master');
  });
});
