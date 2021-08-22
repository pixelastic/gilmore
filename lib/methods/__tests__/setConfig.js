const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/setConfig');
const repo = new Gilmore(repoPath);

describe('setConfig', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should set a config value', async () => {
    await repo.init();
    await repo.setConfig('user.name', 'Gilmore');

    const actual = await repo.getConfig('user.name');
    expect(actual).toEqual('Gilmore');
  });
  it('should overwrite existing config values', async () => {
    await repo.init();

    await repo.setConfig('user.name', 'Gilmore');
    await repo.setConfig('user.name', 'Hotis');

    const actual = await repo.getConfig('user.name');
    expect(actual).toEqual('Hotis');
  });
});
