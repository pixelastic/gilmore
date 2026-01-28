import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/setConfig');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('setConfig', () => {
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should set a config value', async () => {
    await repo.init();
    await repo.setConfig('gilmore.name', 'Gilmore');

    const actual = await repo.getConfig('gilmore.name');
    expect(actual).toBe('Gilmore');
  });
  it('should overwrite existing config values', async () => {
    await repo.init();

    await repo.setConfig('gilmore.name', 'Gilmore');
    await repo.setConfig('gilmore.name', 'Hotis');

    const actual = await repo.getConfig('gilmore.name');
    expect(actual).toBe('Hotis');
  });
});
