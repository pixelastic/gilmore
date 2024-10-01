import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/getConfig');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('getConfig', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return a config value', async () => {
    await repo.init();
    await repo.setConfig('user.name', 'Gilmore');

    const actual = await repo.getConfig('user.name');
    expect(actual).toEqual('Gilmore');
  });
  it('should return null if no config value', async () => {
    await repo.init();

    const actual = await repo.getConfig('gilmore.testvalue');
    expect(actual).toEqual(null);
  });
});
