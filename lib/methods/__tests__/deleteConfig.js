import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
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
    expect(actual).toBe(true);

    const value = await repo.getConfig(key);
    expect(value).toBeNull();
  });
  it('should do nothing if the key does not exist', async () => {
    const key = 'gilmore.name';
    await repo.init();

    const actual = await repo.deleteConfig(key);
    expect(actual).toBe(false);

    const value = await repo.getConfig(key);
    expect(value).toBeNull();
  });
  it('should delete all subkeys', async () => {
    await repo.init();
    await repo.setConfig('gilmore.name', 'Gilmore');
    await repo.setConfig('gilmore.email', 'gilmore@gloriousgoods.com');

    await repo.deleteConfig('gilmore');
    const actualName = await repo.getConfig('gilmore.name');
    expect(actualName).toBeNull();
    const actualEmail = await repo.getConfig('gilmore.email');
    expect(actualEmail).toBeNull();
  });
});
