import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/setConfig');
const repo = new Gilmore(repoPath, { globalConfig: false });

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
    expect(actual).toBe('Gilmore');
  });
  it('should overwrite existing config values', async () => {
    await repo.init();

    await repo.setConfig('user.name', 'Gilmore');
    await repo.setConfig('user.name', 'Hotis');

    const actual = await repo.getConfig('user.name');
    expect(actual).toBe('Hotis');
  });
});
