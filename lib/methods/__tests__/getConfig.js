import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/getConfig');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('getConfig', () => {
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return a config value', async () => {
    await repo.init();
    await repo.setConfig('gilmore.name', 'Gilmore');

    const actual = await repo.getConfig('gilmore.name');
    expect(actual).toBe('Gilmore');
  });
  it('should return null if no config value', async () => {
    await repo.init();

    const actual = await repo.getConfig('gilmore.testvalue');
    expect(actual).toBeNull();
  });
});
