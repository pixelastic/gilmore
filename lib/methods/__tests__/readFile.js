import { emptyDir, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/readFile');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('readFile', () => {
  afterEach(async () => {
    await emptyDir(repoPath);
  });

  it('should return the content of the file at the specified commit', async () => {
    await repo.init();
    await repo.writeFile('my content', 'my-file.txt');
    const commit = await repo.commitAll();

    const actual = await repo.readFile('my-file.txt', commit);
    expect(actual).toBe('my content');
  });
  it('should return false if no such file', async () => {
    await repo.init();
    await repo.writeFile('my content', 'my-file.txt');
    const commit = await repo.commitAll();

    const actual = await repo.readFile('missing-file.txt', commit);
    expect(actual).toBe(false);
  });
  describe('no commit specified', () => {
    it('should return the current content if no commit specified', async () => {
      await repo.init();
      await repo.writeFile('my content', 'my-file.txt');

      const actual = await repo.readFile('my-file.txt');
      expect(actual).toBe('my content');
    });
    it('should return false if no such file', async () => {
      await repo.init();
      const actual = await repo.readFile('missing-file.txt');
      expect(actual).toBe(false);
    });
  });
});
