import { mkdirp, remove, tmpDirectory } from 'firost';
import Gilmore from '../main.js';

const repoPath = tmpDirectory('gilmore/main');

describe('Gilmore', () => {
  it('should default to the caller directory', async () => {
    await mkdirp(`${repoPath}/.git`);
    process.chdir(repoPath);

    const repo = new Gilmore(null, { globalConfig: false });

    expect(repo).toHaveProperty('root', repoPath);

    await remove(repoPath);
  });
});
