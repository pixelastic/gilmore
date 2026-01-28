import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/writeFile');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('writeFile', () => {
  afterEach(async () => {
    await remove(repoPath);
  });

  it('should write content to a file in the repo', async () => {
    await repo.init();
    await repo.writeFile('# gilmore', 'README.md');
    await repo.commitAll('Add readme');

    const actual = await repo.readFile('README.md');
    expect(actual).toBe('# gilmore');
  });
});
