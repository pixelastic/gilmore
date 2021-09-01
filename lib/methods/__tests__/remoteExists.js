const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/remoteExists');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('remoteExists', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return true if the remote exists locally', async () => {
    await repo.createRemote('origin', 'git@origin.com');

    const actual = await repo.remoteExists('origin');
    expect(actual).toEqual(true);
  });
  it('should return false if the remote does not exist locally', async () => {
    await repo.createRemote('origin', 'git@origin.com');

    const actual = await repo.remoteExists('fork');
    expect(actual).toEqual(false);
  });
});
