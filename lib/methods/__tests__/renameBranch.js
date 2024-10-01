import { emptyDir, tmpDirectory } from 'firost';
import { _ } from 'golgoth';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/renameBranch');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('renameBranch', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);

    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  describe('one branch specified', () => {
    it('should rename current branch to specified name', async () => {
      await repo.renameBranch('develop');

      const actual = await repo.currentBranchName();
      expect(actual).toEqual('develop');
    });
    it('should throw an error if a branch by that name already exists', async () => {
      await repo.switchBranch('develop');
      await repo.switchBranch('main');

      let actual;
      try {
        await repo.renameBranch('develop');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_BRANCH_RENAME_ALREADY_EXISTS'
      );
    });
  });
  describe('two branches specified', () => {
    it('should rename given branch to given name', async () => {
      await repo.switchBranch('develop');
      await repo.switchBranch('main');

      await repo.renameBranch('develop', 'feature');

      const actual = await repo.branchList();
      const branchNames = _.map(actual, 'name');
      expect(branchNames).toEqual(['feature', 'main']);
    });
    it('should throw an error if destination branch already exist', async () => {
      await repo.switchBranch('develop');
      await repo.switchBranch('fix');
      await repo.switchBranch('main');

      let actual;
      try {
        await repo.renameBranch('develop', 'fix');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_BRANCH_RENAME_ALREADY_EXISTS'
      );
    });
    it('should throw an error if source branch does not exist', async () => {
      let actual;
      try {
        await repo.renameBranch('develop', 'fix');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_BRANCH_RENAME_DOES_NOT_EXIST'
      );
    });
  });
});
