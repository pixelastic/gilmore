const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/switchRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('switchRemote', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('changes the current remote', async () => {
    expect(await repo.currentRemoteName()).toEqual(false);

    await repo.createRemote('origin', 'git@origin.com');
    expect(await repo.currentRemoteName()).toEqual(false);

    await repo.switchRemote('origin');
    expect(await repo.currentRemoteName()).toEqual('origin');
  });
  it('throws an error if the remote does not exist', async () => {
    let actual;
    try {
      await repo.switchRemote('nope');
    } catch (err) {
      actual = err;
    }
    expect(actual).toHaveProperty(
      'code',
      'GILMORE_REMOTE_SWITCH_UNKNOWN_REMOTE_NAME'
    );
  });
});
