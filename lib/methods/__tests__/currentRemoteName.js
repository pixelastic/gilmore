import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/currentRemoteName');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('currentRemoteName', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return the name of the set remote', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();

    await repo.setRemote('origin', 'git@origin.com');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual('origin');
  });
  it('should return the name of the last set remote', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();

    await repo.setRemote('origin', 'git@origin.com');
    await repo.setRemote('fork', 'git@fork.com');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual('fork');
  });
  it('should return false if no remote defined', async () => {
    await repo.writeFile('something', 'README.md');
    await repo.commitAll();
    await repo.switchBranch('feature');

    const actual = await repo.currentRemoteName();
    expect(actual).toEqual(false);
  });
  describe('no branch defined', () => {
    it('should return false if no remote configured', async () => {
      const actual = await repo.currentRemoteName();
      expect(actual).toEqual(false);
    });
    it('should return origin if it exist', async () => {
      await repo.setConfig('remote.origin.url', 'git@origin.com');

      const actual = await repo.currentRemoteName();
      expect(actual).toEqual('origin');
    });
    it('should not return custom remote even if it is the only one', async () => {
      await repo.setConfig('remote.fork.url', 'git@fork.com');

      const actual = await repo.currentRemoteName();
      expect(actual).toEqual(false);
    });
  });
});
