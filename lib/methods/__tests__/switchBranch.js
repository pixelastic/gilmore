const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/switchBranch');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('switchBranch', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should create the branch if it does not exist', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');

    const actual = await repo.currentBranchName();
    expect(actual).toEqual('feature');
  });
  it('should change the current branch', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');
    await repo.switchBranch('master');

    const actual = await repo.currentBranchName();
    expect(actual).toEqual('master');
  });
  it('should do nothing if already on the branch', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');
    await repo.switchBranch('feature');

    const actual = await repo.currentBranchName();
    expect(actual).toEqual('feature');
  });
  it('should do nothing on clean repo', async () => {
    await repo.init();
    await repo.switchBranch('feature');

    const actual = await repo.currentBranchName();
    expect(actual).toEqual(false);
  });
});
