import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/getRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('getRemote', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  describe('with argument', () => {
    it('should return false if no such remote', async () => {
      const actual = await repo.getRemote('origin');
      expect(actual).toEqual(false);
    });
    it('should return the name and url of the specified remote', async () => {
      await repo.createRemote('fork', 'git@fork.com');

      const actual = await repo.getRemote('fork');
      expect(actual).toHaveProperty('name', 'fork');
      expect(actual).toHaveProperty('url', 'git@fork.com');
      expect(actual).toHaveProperty('isCurrent', false);
    });
    it('should set isCurrent to true if this is the current remote', async () => {
      await repo.setRemote('fork', 'git@fork.com');

      const actual = await repo.getRemote('fork');
      expect(actual).toHaveProperty('name', 'fork');
      expect(actual).toHaveProperty('url', 'git@fork.com');
      expect(actual).toHaveProperty('isCurrent', true);
    });
  });
  describe('no argument', () => {
    it('should use the current remote defined in the current branch', async () => {
      await repo.setRemote('fork', 'git@fork.com');

      const actual = await repo.getRemote();
      expect(actual).toHaveProperty('name', 'fork');
      expect(actual).toHaveProperty('url', 'git@fork.com');
      expect(actual).toHaveProperty('isCurrent', true);
    });
    it('should use origin if no remote defined in the current branch', async () => {
      await repo.createRemote('origin', 'git@origin.com');

      const actual = await repo.getRemote();
      expect(actual).toHaveProperty('name', 'origin');
      expect(actual).toHaveProperty('url', 'git@origin.com');
      expect(actual).toHaveProperty('isCurrent', true);
    });
  });
});
