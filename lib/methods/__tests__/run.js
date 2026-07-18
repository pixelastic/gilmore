import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

describe('run', () => {
  describe('env isolation', () => {
    const repoPath = tmpDirectory('gilmore/run');
    const repo = new Gilmore(repoPath, { globalConfig: false });

    const decoyPath = tmpDirectory('gilmore/run-decoy');
    const decoy = new Gilmore(decoyPath, { globalConfig: false });

    let savedGitDir;
    let savedGitWorkTree;
    beforeEach(() => {
      savedGitDir = process.env.GIT_DIR;
      savedGitWorkTree = process.env.GIT_WORK_TREE;
    });
    afterEach(async () => {
      if (savedGitDir === undefined) {
        delete process.env.GIT_DIR;
      } else {
        process.env.GIT_DIR = savedGitDir;
      }
      if (savedGitWorkTree === undefined) {
        delete process.env.GIT_WORK_TREE;
      } else {
        process.env.GIT_WORK_TREE = savedGitWorkTree;
      }
      await remove(repoPath);
      await remove(decoyPath);
    });

    it('should not leak GIT_DIR from parent environment into subprocess', async () => {
      await repo.init();
      await repo.newFile('mine.txt');
      await repo.commitAll('initial');

      await decoy.init();
      await decoy.newFile('decoy.txt');
      await decoy.commitAll('decoy');

      // Point GIT_DIR at the decoy repo
      process.env.GIT_DIR = `${decoyPath}/.git`;

      const actual = await repo.run('log --oneline --format=%s');
      expect(actual).toBe('initial');
    });

    it('should operate on Gilmore root when GIT_WORK_TREE points elsewhere', async () => {
      await repo.init();
      await repo.newFile('mine.txt');
      await repo.commitAll('initial');

      await decoy.init();

      // Point GIT_WORK_TREE at the decoy
      process.env.GIT_WORK_TREE = decoyPath;

      const actual = await repo.run('rev-parse --show-toplevel');
      expect(actual).toBe(repoPath);
    });
  });
});
