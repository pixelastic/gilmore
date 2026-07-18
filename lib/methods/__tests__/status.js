import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/status');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('status', () => {
  afterEach(async () => {
    await remove(repoPath);
  });

  describe('env isolation', () => {
    const dirtyPath = tmpDirectory('gilmore/status-dirty');
    const dirtyRepo = new Gilmore(dirtyPath, { globalConfig: false });

    let savedGitDir;
    beforeEach(() => {
      savedGitDir = process.env.GIT_DIR;
    });
    afterEach(async () => {
      if (savedGitDir === undefined) {
        delete process.env.GIT_DIR;
      } else {
        process.env.GIT_DIR = savedGitDir;
      }
      await remove(dirtyPath);
    });

    it('should return clean status when GIT_DIR env points to a dirty repo', async () => {
      // Clean repo — empty
      await repo.init();

      // Dirty repo — has a committed file
      await dirtyRepo.init();
      await dirtyRepo.newFile('committed.txt');
      await dirtyRepo.commitAll('add file');

      // Point GIT_DIR at the dirty repo; if it leaks, git compares
      // dirty's index (has committed.txt) against clean's work tree
      // (no committed.txt) → shows "deleted"
      process.env.GIT_DIR = `${dirtyPath}/.git`;

      const actual = await repo.status();
      expect(actual).toEqual([]);
    });
  });
  it('should be empty on clean repo', async () => {
    await repo.init();
    const actual = await repo.status();
    expect(actual).toEqual([]);
  });
  it('should return false if not in a repo', async () => {
    const actual = await repo.status();
    expect(actual).toBe(false);
  });
  it('new file => new', async () => {
    await repo.init();
    await repo.writeFile('please read me', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
  it('new file in staging => added', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
  it('existing file modified => updated', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('save readme');
    await repo.writeFile('updated readme', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'modified', name: 'README.md' }]);
  });
  it('new file added then updated', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();
    await repo.writeFile('updated readme', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
});
