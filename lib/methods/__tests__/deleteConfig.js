const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/deleteConfig');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('deleteConfig', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should delete an existing config key', async () => {
    const key = 'gilmore.name';
    await repo.init();
    await repo.setConfig(key, 'Gilmore');

    const actual = await repo.deleteConfig(key);
    expect(actual).toEqual(true);

    const value = await repo.getConfig(key);
    expect(value).toEqual(null);
  });
  it('should do nothing if the key does not exist', async () => {
    const key = 'gilmore.name';
    await repo.init();

    const actual = await repo.deleteConfig(key);
    expect(actual).toEqual(false);

    const value = await repo.getConfig(key);
    expect(value).toEqual(null);
  });
  it('should delete all subkeys', async () => {
    await repo.init();
    await repo.setConfig('gilmore.name', 'Gilmore');
    await repo.setConfig('gilmore.email', 'gilmore@gloriousgoods.com');

    await repo.deleteConfig('gilmore');
    const actualName = await repo.getConfig('gilmore.name');
    expect(actualName).toEqual(null);
    const actualEmail = await repo.getConfig('gilmore.email');
    expect(actualEmail).toEqual(null);
  });
});
