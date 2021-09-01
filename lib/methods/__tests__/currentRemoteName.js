const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/currentRemoteName');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('currentRemoteName', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return false if no current branch', async () => {
    const actual = await repo.currentRemoteName();
    expect(actual).toEqual(false);
  });
  it('should return false if no remote defined', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();
    await repo.switchBranch('feature');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual(false);
  });
  it('should return the name of the only remote', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();

    await repo.setRemote('origin', 'git@origin.com');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual('origin');
  });
  it('should return the name of the current remote', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();

    await repo.setRemote('origin', 'git@origin.com');
    await repo.setRemote('fork', 'git@fork.com');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual('fork');
  });
});
